import { naturalStringCompareIgnoreCase } from './compare-service';

export interface IFilter {
  id: string;
  pull: (values: any) => any;
  comparer?: (a: any, b: any) => number;
  exclude: boolean;
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
}

export function filterFactory(filter: IFilter) {
  const comparer = filter.comparer || naturalStringCompareIgnoreCase;

  switch (filter.operator) {
    case '$includes': return test(filter, includes, n => n >= 0);
    case '$excludes': return test(filter, includes, n => n === -1);
    case '$eq': return test(filter, comparer, n => n === 0);
    case '$neq': return test(filter, comparer, n => n !== 0);
    case '$lt': return test(filter, comparer, n => n < 0);
    case '$gt': return test(filter, comparer, n => n > 0);
    case '$lte': return test(filter, comparer, n => n <= 0);
    case '$gte': return test(filter, comparer, n => n >= 0);
    case '$starts-with': return test(filter, (a, b) => startsWith(a, b, comparer), n => n === 0);
    case '$ends-with': return test(filter, (a, b) => endsWith(a, b, comparer), n => n === 0);
    case '$in-range': return test(filter, (a, b) => inRange(a, b, comparer), n => n === 0);
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
      return args.length
        ? args.every(arg => !assert(comparer(val, arg)))
        : true;
    }
    : function (values: any) {
      const val = filter.pull(values);
      return args.length
        ? args.some(arg => assert(comparer(val, arg)))
        : true;
    }
}

function includes(a: any, b: any) {
  const sa = a.toString().toLowerCase();
  const sb = b.toString().toLowerCase();
  return sa.indexOf(sb);
}

function startsWith(a: any, b: any, comparer: (a: any, b: any) => number) {
  const start = a.substring(0, b.length);
  return comparer(start, b);
}

function endsWith(a: any, b: any, comparer: (a: any, b: any) => number) {
  const end = a.substring(a.length - b.length);
  return comparer(end, b);
}

function inRange(a: any, b: any, comparer: (a: any, b: any) => number) {
  return comparer(a, b[0]) >= 0 && comparer(a, b[1]) <= 0 ? 0 : 1;
}