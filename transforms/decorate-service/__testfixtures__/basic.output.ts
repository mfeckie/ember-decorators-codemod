import { inject as service } from '@ember-decorators/service';

export default class Foo {
  @service testService;
  @service('testService') renamedService;
}