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
* [basic](#basic)
* [component](#component)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.ts](transforms/decorate/__testfixtures__/basic.input.ts)</small>):
```ts
import { inject as service } from '@ember/service';

import { computed } from '@ember/object';

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

import { computed } from '@ember-decorators/object';

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
<a id="component">**component**</a>

**Input** (<small>[component.input.ts](transforms/decorate/__testfixtures__/component.input.ts)</small>):
```ts
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class FooComponent extends Component {
  classNames = ['a', 'b', 'c'];
  someService = service();
}
```

**Output** (<small>[component.output.ts](transforms/decorate/__testfixtures__/component.output.ts)</small>):
```ts
import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';

export default class FooComponent extends Component {
  @classNames('a', 'b', 'c');
  @service() someService;
}
```
<!--FIXTURES_CONTENT_END-->