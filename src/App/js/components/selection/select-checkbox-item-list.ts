import m from 'mithril';
import { checkboxItem, ICheckboxItem } from './checkbox-item';
import { checkboxItemList } from './checkbox-item-list';

export interface ISelectCheckboxItemList {
  selectAll: boolean;
  items: ICheckboxItem[];
  onchange?: (model: ISelectCheckboxItemList) => void;
}

export interface ISelectCheckboxItemListAttrs extends m.Attributes {
  model: ISelectCheckboxItemList
}
export const selectCheckboxItemList: m.FactoryComponent<ISelectCheckboxItemListAttrs> = () => {
  return {
    view: vn => render(vn.attrs.model)
  }

  function render(model: ISelectCheckboxItemList) {
    const selectAllModel = {
      name: '(Select All)',
      value: '',
      checked: model.selectAll,
      onchange: (e: Event) => selectAllChanged((e.target as HTMLInputElement).checked, model)
    }

    return m('.selectCheckboxItemList',
      { onchange: model.onchange ? model.onchange(model) : undefined },
      m(checkboxItem, { model: selectAllModel }),
      m(checkboxItemList, { model: model.items })
    );
  }

  function selectAllChanged(checked: boolean, model: ISelectCheckboxItemList) {
    model.selectAll = checked;
    model.items.forEach(item => item.checked = checked);
  }
}