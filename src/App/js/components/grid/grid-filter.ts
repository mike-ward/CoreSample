import m from 'mithril';
import stream from 'mithril/stream';
import { naturalStringCompare } from '../../services/compare-service';
import { IFilter } from '../../services/filter-service';
import { ISelectCheckboxItemList, selectCheckboxItemList } from '../selection/select-checkbox-item-list';
import { IGridModel, IGridRow } from './grid-types';

export interface IGridFilterSelectAttrs extends m.Attributes {
  columnId: string;
  gridModel: stream.Stream<IGridModel>;
}

export const gridFilterSelect: m.FactoryComponent<IGridFilterSelectAttrs> = () => {
  return {
    view: vn => {
      const model = pickList(vn.attrs.columnId, vn.attrs.gridModel);
      return m(selectCheckboxItemList, { model: model });
    }
  }
}

function pickList(columnId: string, gridModel: stream.Stream<IGridModel>) {
  const list = gridModel()
    .rows
    .map(row => row[columnId])
    .reduce((a, c) => { a[c] = null; return a }, {});

  const items = Object.keys(list).sort(naturalStringCompare);
  const idx = getfilterIndex(columnId, gridModel());
  const filter = idx >= 0 ? gridModel().filters[idx] : null;
  const selectAll = filter ? !filter.exclude : true;

  const selectBoxItemsList: ISelectCheckboxItemList = {
    selectAll: selectAll,
    onchange: (selectCheckboxItemList: ISelectCheckboxItemList) => addOrUpdateFilter(selectCheckboxItemList, filter, columnId, gridModel),
    items: items.map(item => ({
      name: item,
      value: item,
      checked: filter ? (checkedState(name, filter) && filter.exclude) : selectAll
    }))
  }

  return selectBoxItemsList;
}

function addOrUpdateFilter(selectCheckboxItemList: ISelectCheckboxItemList, filter: IFilter, columnId: string, gridModel: stream.Stream<IGridModel>): void {
  const updatedFilter = filter || {} as IFilter;
  updatedFilter.id = columnId;
  updatedFilter.comparer = filter ? filter.comparer : null;
  updatedFilter.pull = (row: IGridRow) => row[columnId]
  updatedFilter.exclude = !selectCheckboxItemList.selectAll;
  updatedFilter.operator = filter ? filter.operator : '$includes';
  updatedFilter.arg = selectCheckboxItemList.items.reduce((a, c) => {
    if (c.checked !== updatedFilter.exclude) a.push(c);
    return a;
  }, []);

  console.log(updatedFilter)
  const gm = gridModel();
  //gm.filters = [updatedFilter];
  gridModel(gm);
}

function checkedState(name: string, filter: IFilter) {
  const item = Array.isArray(filter.arg) ? filter.arg.find(f => f === name) : null;
  return item != null;
}

function getfilterIndex(columnId: string, gridModel: IGridModel) {
  if (!gridModel.filters) return -1;
  return gridModel.filters.findIndex(f => f.id === columnId);
}