import { computed } from '@ember-decorators/object';
import Component from '@ember/component';

export default class MyComponent {
  @computed('foo')
  get complexComputed() {
    return this.foo;
  }
  set complexComputed(value: any) {
    this.foo = '';
  }
}
