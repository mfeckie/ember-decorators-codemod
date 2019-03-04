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
  const j = getParser(api).withParser('ts');
  const ast = j(file.source);

  if (hasTaskClassProperties(ast, j)) {
    calculateImports(ast, j);

    ast.find(j.ClassProperty, taskLookup).forEach((path) => {
      convertToDecorator(path, ast, j);
    });

    ast.find(j.ClassProperty, modifierLookup).forEach((path) => {
      convertToModifiedDecorator(path, ast, j);
    });

    renameImport(ast, j);
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

  const specififersToKeep = taskNode.specifiers.filter(
    (node) => node.imported.name === 'timeout'
  );

  if (specififersToKeep.length === 0) {
    taskNode.source = "'ember-concurrency-decorators'";
    const importSpecifiers = Array.from(imports).map((importName) => {
      const name = importName === 'task' ? importName : `${importName}Task`;
      return j.importSpecifier(j.identifier(name));
    });
    taskNode.specifiers = importSpecifiers;
  }

  if (specififersToKeep.length > 0) {
    taskNode.specifiers = specififersToKeep;

    const toImport = Array.from(imports)
      .map((importName) => {
        if (importName === 'task') {
          return importName;
        }
        return `${importName}Task`;
      })
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
  imports.add('task');
  const methodName = nodePath.value.key.name;
  const functionBody = nodePath.value.value.arguments[0].body;
  const params = nodePath.value.value.arguments[0].params;

  const newNode = baseTaskNode(j);

  newNode.key.name = methodName;
  newNode.body = functionBody;
  newNode.params = params;

  nodePath.replace(newNode);
}

function convertToModifiedDecorator(nodePath, ast, j) {
  const taskName = j(nodePath)
    .find(j.MemberExpression)
    .get().value.property.name;

  const methodName = nodePath.get().node.key.name;
  const functionBody = j(nodePath)
    .find(j.BlockStatement)
    .get().node;

  const params = j(nodePath).find(j.FunctionExpression).get().node.params;

  const decoratorName = `${taskName}Task`;

  const newNode = baseTaskNode(j);

  newNode.key.name = methodName;
  newNode.body = functionBody;
  newNode.params = params;
  newNode.decorators[0].expression.name = decoratorName;

  nodePath.replace(newNode);
}

function baseTaskNode(j) {
  const parser = j.withParser('babylon');
  const fakeNode = parser(`class Fake { @task\n*foo() {}\n }`);
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
  const classProperties = ast.find(j.ClassProperty, taskLookup).length !== 0;
  const modfiers = ast.find(j.ClassProperty, modifierLookup).length !== 0;

  return classProperties || modfiers;
}
