﻿import m from 'mithril';
import stream from 'mithril/stream';

export interface IGridAttrs extends m.Attributes {
  model: stream.Stream<IGridModel>
}

export interface IGridModel {
  columns: IGridColumn[];
  rows: IGridRow[];
  /** Used to assoicate DOM elements with data array items. If specified, must be a column id. Typically not needed.*/
  key?: string;
  /** Extra stuff that gets passed to cell renderers, cell click handlers and cell tootips */
  meta?: any;
}

export interface IGridColumn {
  id: string;
  name: string;
  /** Can use mithril's style strings https://mithril.js.org/hyperscript.html#style-attribute */
  css?: string | object;
  hide?: boolean;
  tooltip?: string;
  /** Determines the order of columns displayed (not implemented) */
  ordinal?: number;

  /** When enabled, changes cursor to "pointer" and adds direction arrows, click handlers */
  sortEnable?: boolean;
  /** Multi-column sorting order (not implemented) */
  sortLevel?: number;
  /** 1 = up, -1 = down */
  sortDirection?: number;
  /** Defaults to compareService.sortAny() when sortAllow is true */
  sortComparer?: (a: IGridRow, b: IGridRow) => number;

  /** Tooltip to display when hovering over cell */
  cellTooltip?: (value: any, renderedValue: any, column: IGridColumn, row: IGridRow, meta: any) => string;
  /** Action to take when cell is clicked. If specified, grid changes cursor style to "pointer" */
  cellClick?: (event: KeyboardEvent, value: any, renderedValue: any, column: IGridColumn, row: IGridRow, meta: any) => void;
  /** Allows custom rendering of values. Commonly used to handle null/empty values. Return string or vnode */
  cellRenderer?: (value: any, column: IGridColumn, row: IGridRow, meta: any) => string | m.Vnode;
}

export type IGridRow = {
  [columnId: string]: any
};

export interface IGridViewModel {
  columns: IGridColumn[];
  vrows: IGridViewRow[];
  updateSort: (columnId: string) => void;
}

export interface IGridViewRow {
  key?: string;
  data: { [key: string]: IGridViewCell };
}

export interface IGridViewCell {
  value: any;
  tooltip: string;
  clickHandler: (event: KeyboardEvent) => void;
}

export interface IGridFilter {
  field: string;
  operator:
  '$eq'
  | '$neq'
  | '$lt'
  | '$gt'
  | '$lte'
  | '$gte'
  | '$starts-with'
  | '$ends-with'
  | '$in-range';
  arg: any;
  exclude: boolean;
}