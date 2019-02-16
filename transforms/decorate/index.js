'use strict';
exports.__esModule = true;
var getParser = require('codemod-cli').jscodeshift.getParser;
var getOptions = require('codemod-cli').getOptions;
var simpleKeywords = [
  'and',
  'alias',
  'bool',
  'collect',
  'deprecatingAlias',
  'empty',
  'equal',
  'filter',
  'filterBy',
  'gt',
  'gte',
  'intersect',
  'lt',
  'lte',
  'match',
  'map',
  'mapBy',
  'max',
  'min',
  'none',
  'not',
  'notEmpty',
  'oneWay',
  'or',
  'reads',
  'readOnly',
  'service',
  'setDiff',
  'sum',
  'sort',
  'sortBy',
  'union',
  'uniq',
  'uniqBy'
];

module.exports = function transformer(file, api) {
  var j = getParser(api);
  var ast = j(file.source);

  renameImport(
    '@ember/object/computed',
    '@ember-decorators/object/computed',
    ast,
    j
  );
  renameImport('@ember/service', '@ember-decorators/service', ast, j);
  reviseComputedImport(ast, j);

  convertComputedToDecorator(ast, j);

  simpleKeywords.forEach(function(keyword) {
    var properties = getNamedProperties(keyword, ast, j);

    properties.forEach(function(property) {
      var dependentKeys = extractDependentKeys(property);
      var name = property.node.key.name;
      var decorated = buildDecorator(keyword, name, dependentKeys, j);
      property.replace(decorated);
    });
  });

  return ast.toSource({ quote: 'single' });
};

function convertComputedToDecorator(ast, j) {
  const computeds = getNamedProperties('computed', ast, j);
  computeds.forEach((nodePath) => processComputed(nodePath, j));
}

function processComputed(nodePath, j) {
  const node = nodePath.get().node;
  const methodName = node.key.name;
  const args = node.value.arguments;

  if (args[args.length - 1].type === 'FunctionExpression') {
    const newNode = buildComputedGet(methodName, args, j);
    nodePath.replace(newNode);
  } else {
    // do complex version
  }
}

function buildComputedGet(methodName, args, j) {
  const newNode = j('class Fake {\n@computed()\nget foo() { }\n}')
    .find(j.ClassMethod)
    .get().node;

  newNode.key.name = methodName;

  const method = args.pop();
  const blockStatement = method.body;

  newNode.decorators[0].expression.arguments = args;
  newNode.body = blockStatement;

  return newNode;
}

function reviseComputedImport(ast, j) {
  if (usesComputed(ast, j)) {
    const finder = findImport('@ember/object', ast, j).filter((node) => {
      return (
        j(node).find(j.Specifier, { imported: { name: 'computed' } }).length !==
        0
      );
    });
    if (finder.length !== 0) {
      const node = finder.get().node;
      const filtered = node.specifiers.filter(
        (item) => item.imported.name !== 'computed'
      );

      node.specifiers = filtered;

      if (node.specifiers.length === 0) {
        finder.remove();
      }
    }

    if (hasImport('@ember-decorators/object', ast, j)) {
      const imported = findImport('@ember-decorators/object', ast, j);
      const added = j.importSpecifier(j.identifier('computed'));
      imported.get().node.specifiers.push(added);
    } else {
      ast
        .get()
        .node.program.body.unshift(
          `import { computed } from '@ember-decorators/object';`
        );
    }
  }
}

function usesComputed(ast, j) {
  return getNamedProperties('computed', ast, j).length !== 0;
}

function findImport(name, ast, j) {
  return ast.find(j.ImportDeclaration, {
    source: {
      value: name
    }
  });
}

function hasImport(name, ast, j) {
  return findImport(name, ast, j).length !== 0;
}

function renameImport(from, to, ast, j) {
  var computedImport = ast.find(j.ImportDeclaration, {
    source: { value: from }
  });

  if (computedImport.length) {
    computedImport.get().node.source.value = to;
  }
}

function getNamedProperties(name, ast, j) {
  return ast.find(j.ClassProperty, {
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: name }
    }
  });
}

function extractDependentKeys(node) {
  var classProperty = node.value;
  return classProperty.value.arguments;
}

function buildDecorator(macroName, name, dependentKeys, j) {
  var node = j('class Fake { @' + macroName + "('') " + name + ';}')
    .find(j.ClassProperty)
    .get().node;

  node.decorators[0].expression.arguments = dependentKeys;

  return node;
}
