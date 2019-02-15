const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const simpleMacros = [
  'and',
  'alias',
  'bool',
  'empty',
  'equal',
  'gt',
  'gte',
  'intersect',
  'lt',
  'lte',
  'match',
  'max',
  'min',
  'none',
  'not',
  'notEmpty',
  'oneWay',
  'or',
  'reads',
  'readOnly',
  'setDiff',
  'sum',
  'union',
  'uniq',
  'uniqBy'
];

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions();

  const ast = j(file.source);

  renameImport(ast, j);

  simpleMacros.forEach((macroName) => {
    const properties = getNamedComputed(macroName, ast, j);

    properties.forEach((property) => {
      const dependentKeys = extractDependentKeys(property);
      const name = property.node.key.name;

      const decorated = buildDecorator(macroName, name, dependentKeys, j);

      property.replace(decorated);
    });
  });

  return ast.toSource({ quote: 'single' });
};

function renameImport(ast, j) {
  const computedImport = ast.find(j.ImportDeclaration, {
    source: { value: '@ember/object/computed' }
  });

  if (computedImport.length) {
    computedImport.get().node.source.value =
      '@ember-decorators/object/computed';
  }
}

function getClassProperties(ast, j) {
  return ast.find(j.ClassProperty);
}

function getNamedComputed(name, ast, j) {
  return ast.find(j.ClassProperty, {
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name }
    }
  });
}

function extractDependentKeys(node) {
  const classProperty = node.value;

  return classProperty.value.arguments;
}

function buildDecorator(macroName, name, dependentKeys, j) {
  const node = j(`class Fake { @${macroName}('') ${name};}`)
    .find(j.ClassProperty)
    .get().node;

  node.decorators[0].expression.arguments = dependentKeys;
  return node;
}
