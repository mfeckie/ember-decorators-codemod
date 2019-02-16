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
