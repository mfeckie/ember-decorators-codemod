# decorate-tasks


## Usage

```
npx ember-decorators-codemod decorate-tasks path/of/files/ or/some**/*glob.js

# or

yarn global add ember-decorators-codemod
ember-decorators-codemod decorate-tasks path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [with-modifiers](#with-modifiers)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.ts](transforms/decorate-tasks/__testfixtures__/basic.input.ts)</small>):
```ts
import { task, timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  simpleTask = task(function*(this: Foo) {
    yield timeout(1000);
  });
}

```

**Output** (<small>[basic.output.ts](transforms/decorate-tasks/__testfixtures__/basic.output.ts)</small>):
```ts
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  @task
  *simpleTask(this: Foo) {
    yield timeout(1000);
  }
}

```
---
<a id="with-modifiers">**with-modifiers**</a>

**Input** (<small>[with-modifiers.input.ts](transforms/decorate-tasks/__testfixtures__/with-modifiers.input.ts)</small>):
```ts
import { task } from 'ember-concurrency';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  dropTaskMethodName = task(function*(this: TaskComponent, someArgument: string) {
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

```

**Output** (<small>[with-modifiers.output.ts](transforms/decorate-tasks/__testfixtures__/with-modifiers.output.ts)</small>):
```ts
import { task, dropTask, restartableTask, enqueueTask, keepLatestTask } from 'ember-concurrency-decorators';
import Component from '@ember/component';

export default class TaskComponent extends Component {
  @dropTask
  *dropTaskMethodName(this: TaskComponent, someArgument: string) {
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

```
<!--FIXTURES_CONTENT_END-->