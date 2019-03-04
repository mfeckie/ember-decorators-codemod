import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  @task
  *simpleTask(this: Foo) {
    yield timeout(1000);
  }
}
