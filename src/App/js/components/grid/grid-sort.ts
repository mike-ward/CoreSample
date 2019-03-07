import { IGridModel, IGridViewColumn, IGridViewRow, SortDirection, IGridSort } from "./grid-types";
import { compareService } from '../../services/compare-service';

type comparerType = (a: any, b: any) => number;

export function updateSortState(gm: IGridModel, columnId: string) {
  // allow only one level for now
  if (!gm.sorters || gm.sorters[0].id !== columnId) gm.sorters = [];

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

export function sortRowsByColumns(sorters: IGridSort[], columns: IGridViewColumn[], rows: IGridViewRow[]) {
  for (let sort of sorters || []) {
    if (sort.direction !== SortDirection.none) {
      const comparer: comparerType =
        sort.sortComparer
          ? sort.sortComparer
          : compareService.naturalStringCompare;

      const columnIndex = columns.map(c => c.id).indexOf(sort.id);

      rows.sort((a: IGridViewRow, b: IGridViewRow) => {
        const result = comparer(a.data[columnIndex].value, b.data[columnIndex].value);
        return sort.direction === SortDirection.descending ? -result : +result;
      });
    }
  }
}