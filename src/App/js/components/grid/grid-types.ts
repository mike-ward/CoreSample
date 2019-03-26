import m from 'mithril';
import stream from 'mithril/stream';
import { IFilter } from '../../services/filter-service';

export interface IGridAttrs extends m.Attributes {
  model: stream.Stream<IGridModel>
}

export interface IGridModel {
  rows: IGridRow[];
  columns: IGridColumn[];
  sorters?: IGridSort[],
  filters?: IFilter[],
  ordinals?: number[],

  /** Used to assoicate DOM elements with data array items. If specified, must be a column id. Typically not needed.*/
  key?: string;

  /** Extra stuff that gets passed to cell renderers, cell click handlers and cell tootips */
  meta?: any;
}

export interface IGridColumn {
  /** must be unique for a given grid instance */
  id: string;

  /** column header text */
  name: string;

  /** controls visibility of column */
  hide?: boolean;

  /** Can use mithril's style strings https://mithril.js.org/hyperscript.html#style-attribute */
  css?: string | object;

  /** tooltip to display when hovering over head cell */
  tooltip?: string;

  /** Minimal width of cell (i.e. 5rem, 2pc, 20px, etc.), use 0 for auto calculate */
  minWidth?: string;

  /** When enabled, changes cursor to "pointer" and adds direction arrows, click handlers */
  sortEnable?: boolean;

  /** Defaults to compareService.naturalStringCompare when sortEnable is true */
  sortComparer?: (a: IGridRow, b: IGridRow) => number;

  /** When enabled, hamburger icon will display filter dialog */
  filterEnable?: boolean;

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
  vcols: IGridViewColumn[];
  vrows: IGridViewRow[];
  updateSort: (columnId: string, multiColumn: boolean) => void;
  columnMenu: IGridColumnMenu;
}

export interface IGridViewColumn extends IGridColumn {
  classNames: string;
  sortLevel: number;
}

export interface IGridViewRow {
  key?: string;
  data: IGridViewCell[];
}

export interface IGridViewCell {
  value: any;
  tooltip: string;
  css: string | object;
  clickHandler: (event: KeyboardEvent) => void;
}

export enum SortDirection { none = 0, descending = -1, ascending = 1 }

export interface IGridSort {
  /** column id */
  id: string;
  /** descending, none, ascending */
  direction: SortDirection;
}

export interface IGridColumnMenuAttrs extends m.Attributes {
  model: stream.Stream<IGridModel>;
}

export interface IGridColumnMenu {
  gridColumnMenuIcon: (columnId: string) => m.Vnode,
  gridColumnMenu: () => m.Component<IGridColumnMenuAttrs>
}