import Component from '@ember/component';
import { computed } from '@ember/object';

export default class MyComponent {
  complexComputed = computed('foo', {
    get() {
      return this.foo;
    },
    set(key: string, value: any) {
      this.foo = '';
    }
  });
}
