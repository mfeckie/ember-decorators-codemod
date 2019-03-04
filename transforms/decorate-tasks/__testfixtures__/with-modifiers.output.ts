import { task, dropTask, restartableTask, enqueueTask, keepLatestTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  @dropTask
  *dropTaskMethodName() {
    yield timeout(1000);
  }
  @restartableTask
  *restartableTaskMethodName() {
    yield timeout(1000);
  }
  @enqueueTask
  *enqueueTaskMethodName() {
    yield timeout(1000);
  }
  @keepLatestTask
  *keepLatestTaskMethodName() {
    yield timeout(1000);
  }
  @task
  *basicTask() {
    yield timeout(1000);
  }
}
