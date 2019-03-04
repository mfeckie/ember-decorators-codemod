import { task, timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  dropTaskMethodName = task(function*() {
    yield timeout(1000);
  }).drop();
  restartableTaskMethodName = task(function*() {
    yield timeout(1000);
  }).restartable();
  enqueueTaskMethodName = task(function*() {
    yield timeout(1000);
  }).enqueue();
  keepLatestTaskMethodName = task(function*() {
    yield timeout(1000);
  }).keepLatest();

  basicTask = task(function*(){
    yield timeout(1000);
  });
}
