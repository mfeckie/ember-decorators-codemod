import { inject as service } from '@ember/service';

export default class Foo {
  testService = service();
  renamedService = service('testService');
}