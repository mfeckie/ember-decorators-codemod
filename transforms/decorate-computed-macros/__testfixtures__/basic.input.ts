import { inject as service } from '@ember/service';

import {
  alias,
  and,
  bool,
  empty,
  equal,
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
} from '@ember/object/computed';

export default class Foo {
  @service('thing') foo;

  computedAliased = alias('testService.foo');
  computedAnd = and('foo', 'that.foo');
  computedBool = bool('foo');
  computedEmpty = empty('foo');
  computedEqual = equal('foo', 2);
  computedGt = gt('foo', 3);
  computedGte = gte('foo', 4);
  computedIntersect = intersect('foo', 'bar');
  computedLt = lt('foo', 1);
  computedLte = lte('foo', 0);
  computedMatch = match('foo', /someRegexp/);
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
  computedUnion = union('foo');
  computedUniq = uniq('foo');
  computedUniqBy = uniqBy('foo', 'bar');
}
