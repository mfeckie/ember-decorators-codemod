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
  renameImport('@ember/object', '@ember-decorators/object', ast, j);
  renameImport('@ember/service', '@ember-decorators/service', ast, j);

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
