import m from 'mithril';
import stream from 'mithril/stream';
import { grid } from '../grid/grid';
import { loading } from '../loading/loading'
import { IGridModel, IGridColumn } from '../grid/grid-types';
import { camelIdentifierToTitle } from '../../services/convert-service';
import { gridToExcel } from '../../services/export-excel-service';

export const stocks: m.Component = {
  view: stocksView,
  oninit: oninit
}

interface IModel {
  stocks: stream.Stream<IGridModel>;
}

let model: IModel;

function stocksView() {
  return m('div',
    m('.page-title', `Stocks`),
    m('p', `Count: ${model.stocks() ? model.stocks().rows.length : 0}`),
    model.stocks()
      ? [
        exportButton(),
        m(grid, { model: model.stocks, style: 'font-size:smaller' })
      ]
      : m(loading));
}

function oninit() {
  model = initModel();
  getStocks()
    .then(r => { model.stocks(gridModelFactory(r)) });
}

function initModel() {
  return {
    stocks: stream()
  } as IModel
}

function getStocks() {
  return m.request({ url: 'api/markets/symbols', data: Date.now() });
}

function gridModelFactory(data: any) {
  const fields = ['symbol', 'name', 'date', 'type'];

  const columns = fields
    .map<IGridColumn>(field => ({
      id: field,
      name: camelIdentifierToTitle(field),
      sortEnable: true
    }));

  return {
    columns: columns,
    rows: data
  };
}

function exportButton() {
  return m('button.button.is-small', {
    style: 'margin:1em',
    onclick: () => gridToExcel(model.stocks, 'stocks', 'stocks.xls')
  }, 'Export to Excel');
}