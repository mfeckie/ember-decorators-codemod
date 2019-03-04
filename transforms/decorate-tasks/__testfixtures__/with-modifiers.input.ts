import { task } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  dropTaskMethodName = task(function*() {
    yield true;
  }).drop();
  restartableTaskMethodName = task(function*() {
    yield true;
  }).restartable();
  enqueueTaskMethodName = task(function*() {
    yield true;
  }).enqueue();
  keepLatestTaskMethodName = task(function*() {
    yield true;
  }).keepLatest();

  basicTask = task(function*(){
    yield true;
  });
}
