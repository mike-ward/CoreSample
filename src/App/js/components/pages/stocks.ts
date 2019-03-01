import m from 'mithril';
import stream from 'mithril/stream';
import { camelIdentifierToTitle } from '../../services/convert-service';
import { gridToExcel } from '../../services/export-excel-service';
import { grid } from '../grid/grid';
import { IGridColumn, IGridModel } from '../grid/grid-types';
import { loading } from '../loading/loading';

export const stocks: m.FactoryComponent = () => {
  let model: IModel;

  return {
    oninit: oninit,
    view: stocksView
  }

  interface IModel {
    stocks: stream.Stream<IGridModel>;
  }

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
    getStocks();
  }

  function initModel() {
    return {
      stocks: stream()
    } as IModel
  }

  function getStocks() {
    m.request({ url: 'api/markets/symbols', data: Date.now() })
      .then(r => { model.stocks(gridModelFactory(r)) });
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
}