import { computed } from '@ember-decorators/object';
import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { get, set } from '@ember/object';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  @service() someService;
  @computed('bar')
  get foo() {
    return '';
  }
}
