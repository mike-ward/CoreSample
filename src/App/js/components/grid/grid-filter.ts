import m from 'mithril';
import stream from 'mithril/stream';
import { naturalStringCompare } from '../../services/compare-service';
import { ISelectCheckboxItemList, selectCheckboxItemList } from '../selection/select-checkbox-item-list';
import { IGridModel } from './grid-types';

export interface IGridFilterSelectAttrs extends m.Attributes {
  columnId: string;
  gridModel: stream.Stream<IGridModel>;
}

export const gridFilterSelect: m.FactoryComponent<IGridFilterSelectAttrs> = () => {
  let selectCheckboxItems: ISelectCheckboxItemList;

  return {
    oninit: vn => selectCheckboxItems = pickList(vn.attrs.columnId, vn.attrs.gridModel()),
    view: _vn => render(selectCheckboxItems)
  }
}

function pickList(columnId: string, gridModel: IGridModel) {
  const list = gridModel.rows
    .map(row => row[columnId])
    .reduce((a, c) => { a[c] = null; return a; }, {});

  const items = Object.keys(list)
    .sort(naturalStringCompare);

  return {
    selectAll: true,
    items: items.map(item => ({ name: item, value: item, checked: true }))
  }
}

function render(items: ISelectCheckboxItemList) {
  return m(selectCheckboxItemList, { model: items });
}