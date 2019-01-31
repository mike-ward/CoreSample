import m from 'mithril';
import stream from 'mithril/stream';
import { download } from './download-service';
import { grid } from '../components/grid/grid';
import { IGridModel } from '../components/grid/grid-types';

export function gridToCsv(model: stream.Stream<IGridModel>, filename: string) {
  const hidden = document.createElement('div')
  m.render(hidden, m(grid, { model: model }));
  const table = hidden.getElementsByTagName('table')[0]
  tableToCsv(table, filename);
}

export function tableToCsv(table: HTMLTableElement, filename: string) {
  const rows = [];
  // HTMLCollections are not arrays
  for (let r = 0; r < table.rows.length; r = r + 1) {
    const row = table.rows[r];
    const cols = [] as any[];
    for (let c = 0; c < row.cells.length; c = c + 1) {
      const col = row.cells[c].innerText;
      cols.push(csvValue(col));
    }
    rows.push(cols.join(','));
  }
  download(rows.join('\n'), 'text/csv;charset=utf-8;', filename);
}

function csvValue(value: string) {
  const val = !value ? '' : value;
  const quoteQuotes = val.replace(/"/g, '""');
  return quoteQuotes.search(/("|,|\n)/g) >= 0
    ? `"${quoteQuotes}"`
    : quoteQuotes;
}