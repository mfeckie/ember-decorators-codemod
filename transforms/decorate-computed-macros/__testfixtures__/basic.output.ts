import { inject as service } from '@ember/service';

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
  sum,
  union,
  uniq,
  uniqBy
} from '@ember-decorators/object/computed';

export default class Foo {
  @service('thing') foo;

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
  @union('foo') computedUnion;
  @uniq('foo') computedUniq;
  @uniqBy('foo', 'bar') computedUniqBy;
}
