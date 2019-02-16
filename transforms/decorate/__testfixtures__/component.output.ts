import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  @service() someService;
}