import { computed } from '@ember-decorators/object';
import Component from '@ember/component';
import { map } from '@ember-decorators/object/computed';

export default class MyComponent {
  @map('foo', (a, b) => {
    return '';
  }) mapArrowParams;
  @map('foo', () => {
    return '';
  }) mapArrowNoParams;
  @computed('foo')
  get computedArrow() {
    return '';
  }
}
