import stream from 'mithril/stream';
import { sortRowsByColumns, updateSortState } from './grid-sort';
import { IGridColumn, IGridModel, IGridRow, IGridViewCell, IGridViewColumn, IGridViewModel, IGridViewRow } from './grid-types';
import { gridColumnMenuFactory } from './grid-column-menu';

export function gridViewModel(model: stream.Stream<IGridModel>) {
  const vms = model.map<IGridViewModel>(gm => viewModel(model, gm));
  return vms;
}

function viewModel(model: stream.Stream<IGridModel>, gm: IGridModel) {
  if (!gm) return null;

  const viewColumns = gm.columns
    .filter(c => !c.hide)
    .map(c => ({...c} as IGridViewColumn));

  adjustWidths(viewColumns);
  addClassNames(viewColumns);

  return {
    columns: viewColumns,
    vrows: gridViewDataRows(viewColumns, gm),
    updateSort: (columnId: string) => model(updateSortState(gm, columnId)),
    columnMenu: gridColumnMenuFactory()
  }
}

function gridViewDataRows(columns: IGridViewColumn[], gm: IGridModel) {
  const vrows = [];
  const length = gm.rows.length;

  // Use for loop instead of map for preformance
  for (let row = 0; row < length; ++row) {
    vrows[row] = gridDataRow(columns, gm.rows[row], gm);
  }

  sortRowsByColumns(columns, vrows);
  return vrows;
}

function gridDataRow(columns: IGridColumn[], dataRow: IGridRow, gm: IGridModel) {
  const length = columns.length;
  const data = Object.create(null);

  // Use for loop  for preformance
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

function adjustWidths(columns: IGridViewColumn[]) {
  columns.forEach(column => {
    column.minWidth = column.minWidth
      ? column.minWidth
      : getTextWidth(column.name + "MM") + 'px';
  });
}

function addClassNames(columns: IGridViewColumn[]) {
  columns.forEach(column => {
    if (column.sortEnable) {
      const classes = ['app-grid-sort-indicator'];
      if (!column.sortDirection) classes.push('app-grid-sort-indicator-hi');
      if (column.sortDirection > 0) classes.push('app-grid-sort-indicator-up');
      if (column.sortDirection < 0) classes.push('app-grid-sort-indicator-dn');
      column.classNames = classes.join(' ');
    }
  });
}

function getTextWidth(text: string, fontSize = 16) {
  // https://stackoverflow.com/a/48172630/1032172
  // https://bl.ocks.org/tophtucker/62f93a4658387bb61e4510c37e2e97cf
  const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.04999847412109375, 0.5350006103515625, 0.6100006103515625, 0.7, 0.7, 1.0333328247070312, 0.9800003051757813, 0.38000030517578126, 0.5350006103515625, 0.5350006103515625, 0.7, 0.7633331298828125, 0.45, 0.5350006103515625, 0.45, 0.47833404541015623, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.47833404541015623, 0.47833404541015623, 0.7633331298828125, 0.7633331298828125, 0.7633331298828125, 0.6449996948242187, 1.1216659545898438, 0.925, 0.8683334350585937, 0.8683334350585937, 0.925, 0.8133331298828125, 0.7566665649414063, 0.925, 0.925, 0.5350006103515625, 0.5916671752929688, 0.925, 0.8133331298828125, 1.0883331298828125, 0.925, 0.925, 0.7566665649414063, 0.925, 0.8683334350585937, 0.7566665649414063, 0.8133331298828125, 0.925, 0.925, 1.1449996948242187, 0.925, 0.925, 0.8133331298828125, 0.5350006103515625, 0.47833404541015623, 0.5350006103515625, 0.6699996948242187, 0.7, 0.5350006103515625, 0.6449996948242187, 0.7, 0.6449996948242187, 0.7, 0.6449996948242187, 0.5350006103515625, 0.7, 0.7, 0.47833404541015623, 0.47833404541015623, 0.7, 0.47833404541015623, 0.9800003051757813, 0.7, 0.7, 0.7, 0.7, 0.5350006103515625, 0.5916671752929688, 0.47833404541015623, 0.7, 0.7, 0.925, 0.7, 0.7, 0.6449996948242187, 0.6816665649414062, 0.4, 0.6816665649414062, 0.7416671752929688]
  const avg = 0.7068948203638984
  return text
    .split('')
    .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
    .reduce((cur, acc) => acc + cur) * fontSize
}
