import { task, dropTask, restartableTask, enqueueTask, keepLatestTask } from 'ember-concurrency-decorators';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  @dropTask
  *dropTaskMethodName() {
    yield true;
  }
  @restartableTask
  *restartableTaskMethodName() {
    yield true;
  }
  @enqueueTask
  *enqueueTaskMethodName() {
    yield true;
  }
  @keepLatestTask
  *keepLatestTaskMethodName() {
    yield true;
  }
  @task
  *basicTask() {
    yield true;
  }
}
