import { IGridFilter, IGridViewColumn, IGridRow } from "./grid-types";
import { compareService } from '../../services/compare-service';

export function evalFilter(filter: IGridFilter, columns: IGridViewColumn[], rows: IGridRow[]) {
  var filterFunc = filterFuncFactory(filter, columns);
  return rows.filter(filterFunc);
}

function filterFuncFactory(filter: IGridFilter, columns: IGridViewColumn[]) {
  const args = Array.isArray(filter.arg)
    ? filter.arg as any[]
    : [filter.arg];

  function test(cmp: (a: any, b: any) => number, predicateArg?: (n: number) => boolean) {
    const predicate = predicateArg
      ? predicateArg
      : (n: number) => n === 0;

    const columnIndex = columns.map(c => c.id).indexOf(filter.field);

    return filter.exclude
      ? function (row: IGridRow) {
        const val = row.data[columnIndex].value;
        return args.every(arg => !predicate(cmp(val, arg)))
      }
      : function (row: IGridRow) {
        const val = row.data[columnIndex].value;
        return args.some(arg => predicate(cmp(val, arg)))
      }
  }

  switch (filter.operator) {
    case '$includes': return test(includes, n => n >= 0);
    case '$excludes': return test(includes, n => n === -1);
    case '$eq': return test(compare);
    case '$neq': return test(compare, n => n !== 0);
    case '$lt': return test(compare, n => n < 0);
    case '$gt': return test(compare, n => n > 0);
    case '$lte': return test(compare, n => n <= 0);
    case '$gte': return test(compare, n => n >= 0);
    case '$starts-with': return test(startsWith);
    case '$ends-with': return test(endsWith);
    case '$in-range': return test(inRange);
  };

  return (_: IGridRow) => false;
}

function includes(a: any, b: any) {
  const sa = a.toString().toLowerCase();
  const sb = b.toString().toLowerCase();
  return sa.indexOf(sb);
}

function compare(a: any, b: any) {
  return compareService.naturalStringCompareIgnoreCase(a, b);
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