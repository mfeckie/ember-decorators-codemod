import { task, timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  simpleTask = task(function*(this: Foo) {
    yield timeout(1000);
  });
}
