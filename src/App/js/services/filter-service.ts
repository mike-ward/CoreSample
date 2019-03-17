import { naturalStringCompareIgnoreCase } from './compare-service';

export interface IFilter {
  pull: (values: any) => any;
  operator:
  '$includes'
  | '$excludes'
  | '$eq'
  | '$neq'
  | '$lt'
  | '$gt'
  | '$lte'
  | '$gte'
  | '$starts-with'
  | '$ends-with'
  | '$in-range';
  arg: any;
  exclude: boolean;
}

export function filterFactory(filter: IFilter) {
  switch (filter.operator) {
    case '$includes': return test(filter, includes, n => n >= 0);
    case '$excludes': return test(filter, includes, n => n === -1);
    case '$eq': return test(filter, compare, n => n === 0);
    case '$neq': return test(filter, compare, n => n !== 0);
    case '$lt': return test(filter, compare, n => n < 0);
    case '$gt': return test(filter, compare, n => n > 0);
    case '$lte': return test(filter, compare, n => n <= 0);
    case '$gte': return test(filter, compare, n => n >= 0);
    case '$starts-with': return test(filter, startsWith, n => n === 0);
    case '$ends-with': return test(filter, endsWith, n => n === 0);
    case '$in-range': return test(filter, inRange, n => n === 0);
    default: throw filter;
  }
}

function test(
  filter: IFilter,
  comparer: (a: any, b: any) => number,
  assert: (n: number) => boolean) {
  //
  const args = Array.isArray(filter.arg)
    ? filter.arg as any[]
    : [filter.arg];

  return filter.exclude
    ? function (values: any) {
      const val = filter.pull(values);
      return args.every(arg => !assert(comparer(val, arg)))
    }
    : function (values: any) {
      const val = filter.pull(values);
      return args.some(arg => assert(comparer(val, arg)))
    }
}

function includes(a: any, b: any) {
  const sa = a.toString().toLowerCase();
  const sb = b.toString().toLowerCase();
  return sa.indexOf(sb);
}

function compare(a: any, b: any) {
  return naturalStringCompareIgnoreCase(a, b);
}

function startsWith(a: any, b: any) {
  const start = a.substring(0, b.length);
  return compare(start, b);
}

function endsWith(a: any, b: any) {
  const end = a.substring(a.length - b.length);
  return compare(end, b);
}

function inRange(a: any, b: any) {
  return compare(a, b[0]) >= 0 && compare(a, b[1]) <= 0 ? 0 : 1;
}