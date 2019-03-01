import Component from '@ember/component';
import { map } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class MyComponent {
  mapArrowParams = map('foo', (a, b) => {
    return '';
  });

  mapArrowNoParams = map('foo', () => {
    return '';
  });

  computedArrow = computed('foo', () => {
    return '';
  });
}
