import { JSCodeshift, ASTPath, FileInfo } from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import { ASTNode } from "recast";

const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const simpleKeywords = [
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

module.exports = function transformer(file: FileInfo, api: any) {
  const j: JSCodeshift = getParser(api);

  const ast = j(file.source);

  renameImport('@ember/object/computed', '@ember-decorators/object/computed', ast, j);
  renameImport('@ember/object', '@ember-decorators/object', ast, j);
  renameImport('@ember/service', '@ember-decorators/service', ast, j);

  simpleKeywords.forEach((keyword) => {
    const properties = getNamedProperties(keyword, ast, j);

    properties.forEach((property) => {
      const dependentKeys = extractDependentKeys(property);
      
      const name = property.node.key.name;

      const decorated = buildDecorator(keyword, name, dependentKeys, j);

      property.replace(decorated);
    });
  });

  return ast.toSource({ quote: 'single' });
};

function renameImport(from: string, to: string, ast: Collection<any>, j: JSCodeshift) {
  const computedImport = ast.find(j.ImportDeclaration, {
    source: { value: from }
  });

  if (computedImport.length) {
    computedImport.get().node.source.value =
      to;
  }
}


function getNamedProperties(name: string, ast: Collection<any>, j: JSCodeshift) {
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
