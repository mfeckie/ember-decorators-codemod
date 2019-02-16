import { JSCodeshift, ASTPath, FileInfo } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import { ASTNode } from "recast";

const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const simpleMacros = [
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
  'setDiff',
  'sum',
  'union',
  'uniq',
  'uniqBy'
];

module.exports = function transformer(file: FileInfo, api: any) {
  const j: JSCodeshift = getParser(api);

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

function renameImport(ast: Collection<any>, j: JSCodeshift) {
  const computedImport = ast.find(j.ImportDeclaration, {
    source: { value: '@ember/object/computed' }
  });

  if (computedImport.length) {
    computedImport.get().node.source.value =
      '@ember-decorators/object/computed';
  }
}


function getNamedComputed(name: string, ast: Collection<any>, j: JSCodeshift) {
  return ast.find(j.ClassProperty, {
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name }
    }
  });
}

function extractDependentKeys(node: any): Array<ASTNode> {
  const classProperty = node.value;

  return classProperty.value.arguments;
}

function buildDecorator(macroName: string, name: string, dependentKeys: Array<ASTNode>, j: JSCodeshift) {
  const node = j(`class Fake { @${macroName}('') ${name};}`)
    .find(j.ClassProperty)
    .get().node;

  node.decorators[0].expression.arguments = dependentKeys;
  return node;
}
