import { task, taskGroup, timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  simpleTask = task(function*() {
    yield timeout(1000);
  });
}
