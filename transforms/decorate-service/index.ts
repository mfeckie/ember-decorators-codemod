import { ClassProperty } from 'ast-types/gen/nodes';
import { Collection } from 'jscodeshift/src/Collection';
import { ASTPath, JSCodeshift, FileInfo } from 'jscodeshift';
import { NodePath } from 'recast';

const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

function getServices(classProperties: Collection<ClassProperty>, j) {
  return classProperties
    .filter((path) => j(path).find(j.CallExpression, serviceCallExpression))
    .filter((node) => !node.value.decorators);
}

const serviceCallExpression = {
  callee: { type: 'Identifier', name: 'service' }
};

function hasRename(path: ASTPath, j: JSCodeshift) {
  return j(path).find(j.StringLiteral).length !== 0;
}

module.exports = function transformer(file: FileInfo, api: any) {
  const j = getParser(api);
  const options = getOptions();
  const output = [];
  const ast = j(file.source);

  const serviceImport = ast.find(j.ImportDeclaration, {
    source: { value: '@ember/service' }
  });

  if (serviceImport.length) {
    serviceImport.get().node.source.value = '@ember-decorators/service';
  }

  let classProperties = ast.find(j.ClassProperty);
  let services = getServices(classProperties, j);

  services.forEach((node) => decorateService(node, j));

  return ast.toSource({ quote: 'single' });
};

function decorateService(path: NodePath, j: JSCodeshift) {
  const name = path.node.key.name;
  let rename, replacement;
  if (hasRename(path, j)) {
    rename = j(path)
      .find(j.StringLiteral)
      .get().value.value;
  }
  if (rename) {
    replacement = buildServiceRenamed(rename, name, j);
  } else {
    replacement = buildService(name, j);
  }
  path.replace(replacement);
}

function buildServiceRenamed(rename: string, name: string, j: JSCodeshift) {
  return j(`class Fake { @service('${rename}') ${name}; }`)
    .find(j.ClassProperty)
    .get().node;
}

function buildService(name: string, j: JSCodeshift) {
  return j(`class Fake { @service ${name}; }`)
    .find(j.ClassProperty)
    .get().node;
}
