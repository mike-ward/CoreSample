import m from 'mithril';
import stream from 'mithril/stream';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
import { IGridAttrs, IGridViewCell, IGridViewColumn, IGridViewModel } from './grid-types';
import { gridViewModel } from './grid-view-model';

export const gridStyles =
  `div.app-grid { overflow-x: auto }
   table.app-grid {border:1px;border-collapse:collapse}
  .app-grid th {background-color:${constants.color.dim1};color:${constants.color.text}!important;}
  .app-grid th,.app-grid td {white-space:nowrap;padding:.2em;text-align:left;border:1px solid #eee}
  .app-grid-cell-click-action {cursor:pointer;}
  .app-grid-sort-indicator:hover, .app-grid-sort-indicator-up, .app-grid-sort-indicator-dn {cursor:pointer;}
  .app-grid-sort-indicator-hi:after {content:' ▲';color:#ccd;visibility:hidden;}
  .app-grid-sort-indicator-hi:hover:after {visibility:visible}
  .app-grid-sort-indicator-up:after {content:' ▲'}
  .app-grid-sort-indicator-dn:after {content:' ▼'}`;

cssStylesAdd(gridStyles);

export const grid: m.FactoryComponent<IGridAttrs> = () => {
  let vm: stream.Stream<IGridViewModel>;

  return {
    oninit: vn => vm = gridViewModel(vn.attrs.model),
    view: vn => m('.app-grid', table(vm(), vn.attrs)),
  }
}

function table(vm: IGridViewModel, attrs: IGridAttrs) {
  return vm && vm.columns && vm.vrows
    ? [
      m(vm.columnMenu.gridColumnMenu),
      m('table.app-grid', attrs,
        [
          thead(vm),
          tbody(vm)
        ])
    ]
    : null;
}

function thead(vm: IGridViewModel) {
  const columns = vm.columns;
  const ths = [];

  // Use for loops and index for performance
  for (let col = 0; col < vm.columns.length; ++col) {
    ths[col] = th(vm, columns[col]);
  }
  return m('thead', m('tr', ths));
}

function th(vm: IGridViewModel, column: IGridViewColumn) {
  return m('th',
    {
      class: column.classNames,
      style: { 'min-width': column.minWidth },
      title: column.tooltip,
      onclick: column.sortEnable ? () => vm.updateSort(column.id) : undefined
    },
    column.name,
    vm.columnMenu.gridColumnMenuIcon()
  );
}

function tbody(vm: IGridViewModel) {
  const columns = vm.columns;
  const colLength = columns.length;
  const vrows = vm.vrows;
  const rowLength = vm.vrows.length;
  const trs = [];

  // Use for loops and index for performance
  for (let row = 0; row < rowLength; ++row) {
    const vrow = vrows[row];
    const tds = [];

    for (let col = 0; col < colLength; ++col) {
      const column = columns[col];
      tds[col] = td(vrow.data[column.id], column.css);
    }

    trs[row] = m('tr', { key: vrow.key }, tds);
  }

  return m('tbody', trs);
}

function td(cell: IGridViewCell, css: string | object) {
  return m('td',
    {
      style: css,
      title: cell.tooltip,
      onclick: cell.clickHandler,
      class: cell.clickHandler ? 'app-grid-cell-click' : undefined
    },
    cell.value);
}
