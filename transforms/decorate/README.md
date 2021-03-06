# decorate-computed-macros


## Usage

```
npx ember-decorators-codemod decorate-computed-macros path/of/files/ or/some**/*glob.js

# or

yarn global add ember-decorators-codemod
ember-decorators-codemod decorate-computed-macros path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [arrow-function](#arrow-function)
* [basic](#basic)
* [complex_computed](#complex_computed)
* [component](#component)
* [component_with_initial_import](#component_with_initial_import)
* [service](#service)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="arrow-function">**arrow-function**</a>

**Input** (<small>[arrow-function.input.ts](transforms/decorate/__testfixtures__/arrow-function.input.ts)</small>):
```ts
import Component from '@ember/component';
import { map } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class MyComponent {
  mapArrowParams = map('foo', (a, b) => {
    return '';
  });

  mapArrowNoParams = map('foo', () => {
    return '';
  });

  computedArrow = computed('foo', () => {
    return '';
  });
}

```

**Output** (<small>[arrow-function.output.ts](transforms/decorate/__testfixtures__/arrow-function.output.ts)</small>):
```ts
import { computed } from '@ember-decorators/object';
import Component from '@ember/component';
import { map } from '@ember-decorators/object/computed';

export default class MyComponent {
  @map('foo', (a, b) => {
    return '';
  }) mapArrowParams;
  @map('foo', () => {
    return '';
  }) mapArrowNoParams;
  @computed('foo')
  get computedArrow() {
    return '';
  }
}

```
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.ts](transforms/decorate/__testfixtures__/basic.input.ts)</small>):
```ts
import { inject as service } from '@ember/service';

import { computed, get, set } from '@ember/object';

import {
  alias,
  and,
  bool,
  collect,
  deprecatingAlias,
  empty,
  equal,
  filter,
  filterBy,
  gt,
  gte,
  intersect,
  lt,
  lte,
  match,
  map,
  mapBy,
  max,
  min,
  none,
  not,
  notEmpty,
  oneWay,
  or,
  reads,
  readOnly,
  setDiff,
  sort,
  sortBy,
  sum,
  union,
  uniq,
  uniqBy
} from '@ember/object/computed';

export default class Foo {
  testService = service();
  renamedService = service('testService');

  computedAliased = alias('testService.foo');
  computedAnd = and('foo', 'that.foo');
  computedBool = bool('foo');
  computedCollect = collect('foo');
  computedDeprecatingAlias = deprecatingAlias('person.first', {
    id: 'user-profile.firstName',
    until: '3.0.0',
    url: 'https://example.com/deprecations/user-profile.firstName'
  });
  computedEmpty = empty('foo');
  computedEqual = equal('foo', 2);
  computedFilter = filter('foo', function(item, index, array) {
    return !item.done;
  });
  computedFilterBy = filterBy('chores', 'done', false);
  computedGt = gt('foo', 3);
  computedGte = gte('foo', 4);
  computedIntersect = intersect('foo', 'bar');
  computedLt = lt('foo', 1);
  computedLte = lte('foo', 0);
  computedMatch = match('foo', /someRegexp/);
  computedMap = map('foo', function(item, index) {
    return item.toUpperCase() + '!';
  });
  computedMayBy = mapBy('foo', 'bar');
  computedMax = max('foo', 'bar');
  computedMin = min('foo', 'bar');
  computedNone = none('foo');
  computedNot = not('foo');
  computedNotEmpty = notEmpty('foo');
  computedOneWay = oneWay('foo');
  computedOr = or('foo', 'bar', 'baz');
  computedReads = reads('foo');
  computedReadOnly = readOnly('foo');
  computedSetDiff = setDiff('foo', 'bar');
  computedSum = sum('foo');
  computedSort = sort('foo', function(a, b){
    if (a.priority > b.priority) {
      return 1;
    } else if (a.priority < b.priority) {
      return -1;
    }

    return 0;
  });
  computedSortBy = sortBy('foo', 'bar');
  computedUnion = union('foo');
  computedUniq = uniq('foo');
  computedUniqBy = uniqBy('foo', 'bar');
}

```

**Output** (<small>[basic.output.ts](transforms/decorate/__testfixtures__/basic.output.ts)</small>):
```ts
import { inject as service } from '@ember-decorators/service';

import { computed, get, set } from '@ember/object';

import {
  alias,
  and,
  bool,
  collect,
  deprecatingAlias,
  empty,
  equal,
  filter,
  filterBy,
  gt,
  gte,
  intersect,
  lt,
  lte,
  match,
  map,
  mapBy,
  max,
  min,
  none,
  not,
  notEmpty,
  oneWay,
  or,
  reads,
  readOnly,
  setDiff,
  sort,
  sortBy,
  sum,
  union,
  uniq,
  uniqBy
} from '@ember-decorators/object/computed';

export default class Foo {
  @service() testService;
  @service('testService') renamedService;

  @alias('testService.foo') computedAliased;
  @and('foo', 'that.foo') computedAnd;
  @bool('foo') computedBool;
  @collect('foo') computedCollect;
  @deprecatingAlias('person.first', {
    id: 'user-profile.firstName',
    until: '3.0.0',
    url: 'https://example.com/deprecations/user-profile.firstName'
  }) computedDeprecatingAlias;
  @empty('foo') computedEmpty;
  @equal('foo', 2) computedEqual;
  @filter('foo', function(item, index, array) {
    return !item.done;
  }) computedFilter;
  @filterBy('chores', 'done', false) computedFilterBy;
  @gt('foo', 3) computedGt;
  @gte('foo', 4) computedGte;
  @intersect('foo', 'bar') computedIntersect;
  @lt('foo', 1) computedLt;
  @lte('foo', 0) computedLte;
  @match('foo', /someRegexp/) computedMatch;
  @map('foo', function(item, index) {
    return item.toUpperCase() + '!';
  }) computedMap;
  @mapBy('foo', 'bar') computedMayBy;
  @max('foo', 'bar') computedMax;
  @min('foo', 'bar') computedMin;
  @none('foo') computedNone;
  @not('foo') computedNot;
  @notEmpty('foo') computedNotEmpty;
  @oneWay('foo') computedOneWay;
  @or('foo', 'bar', 'baz') computedOr;
  @reads('foo') computedReads;
  @readOnly('foo') computedReadOnly;
  @setDiff('foo', 'bar') computedSetDiff;
  @sum('foo') computedSum;
  @sort('foo', function(a, b){
    if (a.priority > b.priority) {
      return 1;
    } else if (a.priority < b.priority) {
      return -1;
    }

    return 0;
  }) computedSort;
  @sortBy('foo', 'bar') computedSortBy;
  @union('foo') computedUnion;
  @uniq('foo') computedUniq;
  @uniqBy('foo', 'bar') computedUniqBy;
}

```
---
<a id="complex_computed">**complex_computed**</a>

**Input** (<small>[complex_computed.input.ts](transforms/decorate/__testfixtures__/complex_computed.input.ts)</small>):
```ts
import Component from '@ember/component';
import { computed } from '@ember/object';

export default class MyComponent {
  complexComputed = computed('foo', {
    get() {
      return this.foo;
    },
    set(key: string, value: any) {
      this.foo = '';
    }
  });
}

```

**Output** (<small>[complex_computed.output.ts](transforms/decorate/__testfixtures__/complex_computed.output.ts)</small>):
```ts
import { computed } from '@ember-decorators/object';
import Component from '@ember/component';

export default class MyComponent {
  @computed('foo')
  get complexComputed() {
    return this.foo;
  }
  set complexComputed(value: any) {
    this.foo = '';
  }
}

```
---
<a id="component">**component**</a>

**Input** (<small>[component.input.ts](transforms/decorate/__testfixtures__/component.input.ts)</small>):
```ts
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  someService = service();

  foo = computed('bar', function() {
    return '';
  });
}

```

**Output** (<small>[component.output.ts](transforms/decorate/__testfixtures__/component.output.ts)</small>):
```ts
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

```
---
<a id="component_with_initial_import">**component_with_initial_import**</a>

**Input** (<small>[component_with_initial_import.input.ts](transforms/decorate/__testfixtures__/component_with_initial_import.input.ts)</small>):
```ts
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember-decorators/object';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  someService = service();

  foo = computed('bar', function() {
    return '';
  });
}

```

**Output** (<small>[component_with_initial_import.output.ts](transforms/decorate/__testfixtures__/component_with_initial_import.output.ts)</small>):
```ts
import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { action, computed } from '@ember-decorators/object';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  @service() someService;
  @computed('bar')
  get foo() {
    return '';
  }
}

```
---
<a id="service">**service**</a>

**Input** (<small>[service.input.ts](transforms/decorate/__testfixtures__/service.input.ts)</small>):
```ts
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class TestService extends Service {
  someService = service();
}

```

**Output** (<small>[service.output.ts](transforms/decorate/__testfixtures__/service.output.ts)</small>):
```ts
import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';

export default class TestService extends Service {
  @service() someService;
}

```
<!--FIXTURES_CONTENT_END-->