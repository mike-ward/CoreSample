﻿import stream from 'mithril/stream';
import clone from '../../services/clone-service';
import { gridColumnMenuFactory } from './grid-column-menu';
import { filterFactory } from './grid-filter';
import { sortRowsByColumns, updateSortState } from './grid-sort';
import { IGridColumn, IGridModel, IGridRow, IGridViewCell, IGridViewColumn, IGridViewModel, IGridViewRow } from './grid-types';

export function gridViewModel(model: stream.Stream<IGridModel>) {
  const columnMenu = gridColumnMenuFactory();
  const vms = model.map<IGridViewModel>(gm => {
    if (!gm) return null;

    const viewCols = createViewColumns(gm);
    const viewRows = createViewRows(viewCols, gm.rows, gm.key, gm.meta);

    return {
      vcols: viewCols,
      vrows: viewRows,
      updateSort: (columnId: string) => model(updateSortState(gm, columnId)),
      columnMenu: columnMenu
    }
  });
  return vms;
}

function createViewColumns(gm: IGridModel) {
  const viewColumns = gm.columns
    .filter(c => !c.hide)
    .map(c => clone(c) as IGridViewColumn)
    .map(c => setMinColumnWidth(c))
    .map(c => addSortClassNames(c));
  return viewColumns;
}

function createViewRows(viewCols: IGridViewColumn[], rows: IGridRow[], key: string, meta: any) {
  const rowsLength = rows.length;
  const vrows: IGridViewRow[] = [];

  const filters = viewCols
    .filter(vc => vc.filters)
    .map(vc => vc.filters)
    .reduce((arr, filter) => arr.concat(filter), []) // flatten
    .map(filter => filterFactory(viewCols, filter)); // higher order function

  // Use loop instead of map for preformance
  for (let idx = 0; idx < rowsLength; ++idx) {
    if (filters.every(filter => filter(rows[idx]))) {
      vrows.push(createViewRow(viewCols, rows[idx], key, meta));
    }
  }

  sortRowsByColumns(viewCols, vrows);
  return vrows;
}

function createViewRow(columns: IGridColumn[], gridRow: IGridRow, key: string, meta: any) {
  const data = [];
  const length = columns.length;

  // Use loop and index for preformance
  for (let col = 0; col < length; ++col) {
    data[col] = createDataCell(gridRow, columns[col], meta);
  }

  const row = { data: data } as IGridViewRow;
  // Only create key if value defined to reduce memory footprint
  if (key) row.key = gridRow[key]
  return row;
}

function createDataCell(row: IGridRow, col: IGridColumn, meta: any) {
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

  // Only create if values defined to reduce memory footprint
  if (col.css) cell.css = col.css;
  if (tooltip) cell.tooltip = tooltip;
  if (clickHandler) cell.clickHandler = clickHandler;
  return cell;
}

function setMinColumnWidth(col: IGridViewColumn) {
  col.minWidth = col.minWidth || getTextWidth(col.name + "MM") + 'px';
  return col;
}

function addSortClassNames(col: IGridViewColumn) {
  const classes = ['app-grid-sort-indicator'];
  if (!col.sortDirection) classes.push('app-grid-sort-indicator-hi');
  if (col.sortDirection > 0) classes.push('app-grid-sort-indicator-up');
  if (col.sortDirection < 0) classes.push('app-grid-sort-indicator-dn');
  col.classNames = classes.join(' ');
  return col
}

function getTextWidth(text: string, fontSize = 16) {
  // https://stackoverflow.com/a/48172630/1032172
  // https://bl.ocks.org/tophtucker/62f93a4658387bb61e4510c37e2e97cf
  const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.04999847412109375, 0.5350006103515625, 0.6100006103515625, 0.7, 0.7, 1.0333328247070312, 0.9800003051757813, 0.38000030517578126, 0.5350006103515625, 0.5350006103515625, 0.7, 0.7633331298828125, 0.45, 0.5350006103515625, 0.45, 0.47833404541015623, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.47833404541015623, 0.47833404541015623, 0.7633331298828125, 0.7633331298828125, 0.7633331298828125, 0.6449996948242187, 1.1216659545898438, 0.925, 0.8683334350585937, 0.8683334350585937, 0.925, 0.8133331298828125, 0.7566665649414063, 0.925, 0.925, 0.5350006103515625, 0.5916671752929688, 0.925, 0.8133331298828125, 1.0883331298828125, 0.925, 0.925, 0.7566665649414063, 0.925, 0.8683334350585937, 0.7566665649414063, 0.8133331298828125, 0.925, 0.925, 1.1449996948242187, 0.925, 0.925, 0.8133331298828125, 0.5350006103515625, 0.47833404541015623, 0.5350006103515625, 0.6699996948242187, 0.7, 0.5350006103515625, 0.6449996948242187, 0.7, 0.6449996948242187, 0.7, 0.6449996948242187, 0.5350006103515625, 0.7, 0.7, 0.47833404541015623, 0.47833404541015623, 0.7, 0.47833404541015623, 0.9800003051757813, 0.7, 0.7, 0.7, 0.7, 0.5350006103515625, 0.5916671752929688, 0.47833404541015623, 0.7, 0.7, 0.925, 0.7, 0.7, 0.6449996948242187, 0.6816665649414062, 0.4, 0.6816665649414062, 0.7416671752929688]
  const avg = 0.7068948203638984;
  const length = widths.length;
  let width = 0;

  for (const ch of text) {
    const c = +ch.charCodeAt(0);
    width += c < length ? widths[c] : avg;
  }

  return width * fontSize;
}