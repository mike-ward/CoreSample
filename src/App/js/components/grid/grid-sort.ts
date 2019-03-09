import { IGridModel, IGridViewColumn, IGridViewRow, SortDirection, IGridSort } from "./grid-types";
import { compareService } from '../../services/compare-service';

type comparerType = (a: any, b: any) => number;

export function updateSortState(gm: IGridModel, columnId: string, multiColumn: boolean) {
  if (!gm.sorters) gm.sorters = [];

  if (!multiColumn) {
    if (gm.sorters.length > 1) {
      gm.sorters = [];
      return gm;
    }

    gm.sorters = gm.sorters.filter(s => s.id === columnId);
  }

  let sort = gm.sorters.find(s => s.id === columnId);

  if (!sort) {
    sort = { id: columnId, direction: SortDirection.none }
    gm.sorters.push(sort);
  }

  if (sort.direction === SortDirection.none) sort.direction = SortDirection.ascending;
  else if (sort.direction === SortDirection.ascending) sort.direction = SortDirection.descending;
  else if (multiColumn /* sort.direction === SortDireciton.descending */) sort.direction = SortDirection.ascending;
  else gm.sorters = gm.sorters.filter(s => s.id !== sort.id);
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

  const columnIndex = columns.map(c => c.id).indexOf(sortBy.id);

  const comparer: comparerType =
    columns[columnIndex].sortComparer
      ? columns[columnIndex].sortComparer
      : compareService.naturalStringCompare;

  return (a: IGridViewRow, b: IGridViewRow) =>
    comparer(a.data[columnIndex].value, b.data[columnIndex].value) * sortBy.direction;
}