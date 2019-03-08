import { IGridModel, IGridViewColumn, IGridViewRow, SortDirection, IGridSort } from "./grid-types";
import { compareService } from '../../services/compare-service';

type comparerType = (a: any, b: any) => number;

export function updateSortState(gm: IGridModel, columnId: string, multiColumn: boolean) {
  if (gm.sorters && gm.sorters.length > 1 && !multiColumn) {
    gm.sorters = null;
    return gm;
  }

  if (!gm.sorters) gm.sorters = [];

  let sort = gm.sorters.find(s => s.id === columnId);

  if (!sort) {
    sort = { id: columnId, direction: SortDirection.none, sortComparer: null }
    gm.sorters.push(sort);
  }

  const direction = sort.direction;
  if (direction === SortDirection.none) sort.direction = SortDirection.ascending;
  else if (direction === SortDirection.ascending) sort.direction = SortDirection.descending;
  else sort.direction = SortDirection.none;
  return gm;
}

export function sortRowsByColumns(sorters: IGridSort[], rows: IGridViewRow[], columns: IGridViewColumn[]) {
  if (!sorters) return;

  const comparers = sorters
    .map(s => createComparer(s, columns));

  function byComparers(a: IGridViewRow, b: IGridViewRow) {
    for (let i = 0; i < comparers.length; ++i) {
      const result = comparers[i](a, b)
      if (result) return result;
    }
    return 0;
  }

  rows.sort((a, b) => byComparers(a, b));
}

function createComparer(sortBy: IGridSort, columns: IGridViewColumn[]) {
  if (sortBy.direction === SortDirection.none) {
    return (_a: IGridViewRow, _b: IGridViewRow) => 0;
  }

  const comparer: comparerType =
    sortBy.sortComparer
      ? sortBy.sortComparer
      : compareService.naturalStringCompare;

  const columnIndex = columns.map(c => c.id).indexOf(sortBy.id);

  return (a: IGridViewRow, b: IGridViewRow) =>
    comparer(a.data[columnIndex].value, b.data[columnIndex].value) * sortBy.direction;
}