﻿import m from 'mithril';
import stream from 'mithril/stream';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
import { IGridAttrs, IGridModel, IGridViewCell, IGridViewColumn, IGridViewModel } from './grid-types';
import { gridViewModel } from './grid-view-model';

export const gridStyles =
  `div.app-grid                            {  }
   table.app-grid                          { border:1px; border-collapse:collapse }
   .app-grid th, .app-grid td              { white-space: nowrap; padding: .2rem; text-align: left; border: 1px solid #eee }
   .app-grid th                            { padding-bottom: .3rem;
                                             vertical-align: middle;
                                             color:${constants.color.text} !important;
                                             background-color: ${constants.color.dim1};
                                             -moz-user-select: none }
   .app-grid th sup                        { vertical-align: baseline; position: relative; top: -5px; left: 1.4px; color: ${constants.color.dim3} }
   .app-grid-cell-click-action,
   .app-grid-sort-indicator:hover,
   .app-grid-sort-indicator-up,
   .app-grid-sort-indicator-dn             { cursor: pointer }
   .app-grid-sort-indicator-hi:after       { content: ' ▲'; color:#ccd; visibility:hidden; }
   .app-grid-sort-indicator-hi:hover:after { visibility:visible }
   .app-grid-sort-indicator-up:after       { content: ' ▲' }
   .app-grid-sort-indicator-dn:after       { content: ' ▼' }`;

cssStylesAdd(gridStyles);

export const grid: m.FactoryComponent<IGridAttrs> = () => {
  let vm: stream.Stream<IGridViewModel>;

  return {
    oninit: vn => vm = gridViewModel(vn.attrs.model),
    view: vn => m('.app-grid', table(vm(), vn.attrs.model, vn.attrs)),
  }
}

function table(vm: IGridViewModel, gm: stream.Stream<IGridModel>, attrs: IGridAttrs) {
  return vm
    ? [
      m('table.app-grid', attrs,
        [
          thead(vm),
          tbody(vm)
        ]),
      m(vm.columnMenu.gridColumnMenu, { model: gm }),
    ]
    : null;
}

function thead(vm: IGridViewModel) {
  const ths = [];
  const vcols = vm.vcols;
  const vcolsLength = vm.vcols.length;

  // loop and indexe for performance
  for (let colIndex = 0; colIndex < vcolsLength; ++colIndex) {
    ths[colIndex] = th(vm, vcols[colIndex]);
  }
  return m('thead', m('tr', ths));
}

function th(vm: IGridViewModel, column: IGridViewColumn) {
  const onclick = column.sortEnable
    ? (e: MouseEvent) => {
      vm.updateSort(column.id, e.ctrlKey);
      return false;
    }
    : undefined;

  return m('th',
    {
      class: column.classNames,
      style: { 'min-width': column.minWidth },
      title: column.tooltip,
      onclick: onclick
    },
    m('span', column.name,
      column.sortLevel
        ? m('sup', column.sortLevel)
        : null),
    vm.columnMenu.gridColumnMenuIcon(column.id)
  );
}

function tbody(vm: IGridViewModel) {
  const trs = [];
  const vrows = vm.vrows;
  const rowsCount = vm.vrows.length;

  // loops and indexes for performance
  for (let rowIndex = 0; rowIndex < rowsCount; ++rowIndex) {
    const tds = [];
    const vrow = vrows[rowIndex];
    const data = vrow.data;
    const columnsCount = data.length;

    for (let colIndex = 0; colIndex < columnsCount; ++colIndex) {
      tds[colIndex] = td(data[colIndex]);
    }
    trs[rowIndex] = m('tr', { key: vrow.key }, tds);
  }
  return m('tbody', trs);
}

function td(cell: IGridViewCell) {
  return m('td',
    {
      style: cell.css,
      title: cell.tooltip,
      onclick: cell.clickHandler,
      class: cell.clickHandler ? 'app-grid-cell-click' : undefined
    },
    cell.value);
}