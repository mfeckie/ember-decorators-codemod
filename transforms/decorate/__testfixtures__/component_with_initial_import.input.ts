import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember-decorators/object';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  someService = service();

  foo = computed('bar', function() {
    return '';
  });
}
