const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

function getServices(classProperties, j) {
  return classProperties
    .filter((path) => j(path).find(j.CallExpression, serviceCallExpression))
    .filter((node) => !node.value.decorators);
}

const serviceCallExpression = {
  callee: { type: 'Identifier', name: 'service' }
};

function hasRename(path, j) {
  return j(path).find(j.StringLiteral).length !== 0;
}

module.exports = function transformer(file, api) {
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

function decorateService(path, j) {
  const name = path.node.key.name;
  let rename;
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

function buildServiceRenamed(rename, name, j) {
  return j(`class Fake { @service('${rename}') ${name}; }`)
    .find(j.ClassProperty)
    .get().node;
}

function buildService(name, j) {
  return j(`class Fake { @service ${name}; }`)
    .find(j.ClassProperty)
    .get().node;
}
