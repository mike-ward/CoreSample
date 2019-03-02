import { IGridModel, IGridViewColumn, IGridViewRow } from "./grid-types";
import { compareService } from '../../services/compare-service';

type comparerType = (a: any, b: any) => number;

export function updateSortState(gm: IGridModel, columnId: string) {
  const column = gm.columns.reduce((a, c) => c.id === columnId ? c : a, null);
  if (!column.sortDirection) gm.columns.forEach(col => col.sortDirection = col.id === columnId ? 1 : 0)
  else if (column.sortDirection > 0) column.sortDirection = -1;
  else if (column.sortDirection < 0) column.sortDirection = 0;
  return gm;
}

export function sortRowsByColumns(columns: IGridViewColumn[], rows: IGridViewRow[]) {
  const sortByStates = columns
    .filter(col => col.sortEnable)
    .filter(col => col.sortDirection);
  // future: orderby for sort level

  for (let column of sortByStates) {
    // future: add multiple column sort
    const comparer: comparerType =
      column.sortComparer
        ? column.sortComparer
        : compareService.naturalStringCompare;

    const columnIndex = columns.map(c => c.id).indexOf(column.id);
    const sortDirection = column.sortDirection;

    rows.sort((a: IGridViewRow, b: IGridViewRow) => {
      const result = comparer(a.data[columnIndex].value, b.data[columnIndex].value);
      return sortDirection >= 0 ? result : -result;
    });
  }
}