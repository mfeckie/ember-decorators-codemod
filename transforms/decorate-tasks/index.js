const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const taskLookup = {
  value: { type: 'CallExpression', callee: { name: 'task' } }
};

const modifierLookup = {
  value: {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'task'
        }
      }
    }
  }
};

const imports = new Set();

module.exports = function transformer(file, api) {
  const j = getParser(api).withParser('babylon');
  const ast = j(file.source);

  if (hasTaskClassProperties(ast, j)) {

    renameImport(ast, j);
    calculateImports(ast, j);

    ast.find(j.ClassProperty, taskLookup).forEach((path) => {
      convertToDecorator(path, ast, j);
    });
  }
  return ast.toSource();
};

function renameImport(ast, j) {
  const taskImport = ast.find(j.ImportDeclaration, {
    source: {
      value: 'ember-concurrency'
    }
  });

  const taskNode = taskImport.get().node;

  const specififersToChange = taskNode.specifiers.filter(
    (node) => node.imported.name !== 'timeout'
  );
  const specififersToKeep = taskNode.specifiers.filter(
    (node) => node.imported.name === 'timeout'
  );

  if (specififersToKeep.length === 0) {
    taskNode.source = 'ember-concurrency-decorators';
  }

  if (specififersToKeep.length > 0) {
    taskNode.specifiers = specififersToKeep;
    const toImport = specififersToChange
      .map((node) => node.imported.name)
      .join(', ');

    const newImport = `import { ${toImport} } from 'ember-concurrency-decorators';`;

    ast.get().node.program.body.unshift(newImport);
  }
}

/*
  @task
  foo() {

  }
*/

function convertToDecorator(nodePath, ast, j) {
  const methodName = nodePath.value.key.name;
  const decoratorName = nodePath.value.value.callee.name;
  const functionBody = nodePath.value.value.arguments[0].body;

  const newNode = baseTaskNode(j);

  newNode.key.name = methodName;
  newNode.body = functionBody;

  nodePath.replace(newNode);
}

function baseTaskNode(j) {
  const fakeNode = j(`class Fake { @task\n*foo() {}\n }`);
  return fakeNode.find(j.ClassMethod).get().node;
}

const propertyIdentifier = { property: { type: 'Identifier' } };

function calculateImports(ast, j) {
  const classProperties = ast.find(j.ClassProperty, modifierLookup);
  classProperties.forEach((nodePath) => {
    const node = nodePath.get().node;

    const taskModifier = node.value.callee.property.name;

    imports.add(taskModifier);
  });
}

function hasTaskClassProperties(ast, j) {
  return ast.find(j.ClassProperty, taskLookup).length !== 0;
}
