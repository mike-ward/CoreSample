import stream from 'mithril/stream';
import { sortRowsByColumns, updateSortState } from './grid-sort';
import { IGridModel, IGridViewModel, IGridRow, IGridColumn, IGridViewRow, IGridViewCell } from './grid-types';

export function gridViewModel(model: stream.Stream<IGridModel>) {
  const vms = model.map<IGridViewModel>(mdl => {
    if (!mdl) return null;
    const filteredColumns = mdl.columns.filter(c => !c.hide);

    return {
      columns: filteredColumns,
      vrows: gridViewDataRows(filteredColumns, mdl),
      updateSort: (columnId: string) => model(updateSortState(mdl, columnId))
    }
  });

  return vms;
}

function gridViewDataRows(columns: IGridColumn[], gm: IGridModel) {
  // Prealloate for performance
  const length = gm.rows.length;
  const vrows = [];

  // Use for loop instead of map for preformance
  for (let row = 0; row < length; ++row) {
    vrows[row] = gridDataRow(columns, gm.rows[row], gm);
  }

  sortRowsByColumns(columns, vrows);
  return vrows;
}

function gridDataRow(columns: IGridColumn[], dataRow: IGridRow, gm: IGridModel) {
  const length = columns.length
  const data = Object.create(null);

  // Use for loop instead of reduce() for preformance
  for (let col = 0; col < length; ++col) {
    const column = columns[col];
    data[column.id] = gridDataCell(dataRow, column, gm.meta);
  }

  const row = { data: data } as IGridViewRow;
  // Only create key if value defined to reduce memory footprint
  if (gm.key) row.key = dataRow[gm.key]
  return row;
}

function gridDataCell(row: IGridRow, col: IGridColumn, meta: any) {
  const value = row[col.id];

  const renderedValue = col.cellRenderer
    ? col.cellRenderer(value, col, row, meta)
    : value;

  const tooltip = col.cellTooltip
    ? col.cellTooltip(value, renderedValue, col, row, meta)
    : undefined;

  const clickHandler = (event: KeyboardEvent) => col.cellClick
    ? col.cellClick(event, value, renderedValue, col, row, meta)
    : undefined;

  const cell = { value: renderedValue } as IGridViewCell;

  // Only create keys if values defined to reduce memory footprint
  if (tooltip) cell.tooltip = tooltip;
  if (clickHandler) cell.clickHandler = clickHandler;

  return cell;
}