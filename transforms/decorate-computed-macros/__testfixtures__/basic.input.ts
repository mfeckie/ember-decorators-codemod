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
  @service('thing') foo;

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
