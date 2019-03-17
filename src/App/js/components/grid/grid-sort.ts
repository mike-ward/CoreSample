import { naturalStringCompare } from '../../services/compare-service';
import { IGridModel, IGridSort, IGridViewColumn, IGridViewRow, SortDirection } from "./grid-types";

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
  else gm.sorters = gm.sorters.filter(s => s.id !== sort.id);
  return gm;
}

export function sortRowsByColumns(sorters: IGridSort[], rows: IGridViewRow[], columns: IGridViewColumn[]) {
  if (!sorters) return;

  const comparers = sorters
    .map(s => comparerFactory(s, columns));

  if (comparers.length === 0) return;

  function byComparers(a: IGridViewRow, b: IGridViewRow) {
    for (let i = 0; i < comparers.length; ++i) {
      const result = comparers[i](a, b)
      if (result) return result;
    }
    return 0;
  }

  rows.sort((a, b) => byComparers(a, b));
}

function comparerFactory(sortBy: IGridSort, columns: IGridViewColumn[]) {
  if (sortBy.direction === SortDirection.none) {
    return (_a: IGridViewRow, _b: IGridViewRow) => 0;
  }

  const columnIndex = columns.findIndex(c => c.id === sortBy.id);

  const comparer: comparerType =
    columns[columnIndex].sortComparer
      ? columns[columnIndex].sortComparer
      : naturalStringCompare;

  return (a: IGridViewRow, b: IGridViewRow) =>
    comparer(a.data[columnIndex].value, b.data[columnIndex].value) * sortBy.direction;
}