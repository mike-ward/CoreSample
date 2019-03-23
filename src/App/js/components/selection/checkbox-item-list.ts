import m from 'mithril';
import { ICheckboxItem, checkboxItem } from './checkbox-item';

export interface ICheckboxItemListAttrs extends m.Attributes {
  model: ICheckboxItem[];
}

export const checkboxItemList: m.FactoryComponent<ICheckboxItemListAttrs> = () => {
  let vm: ICheckboxItem[];

  return {
    oninit: vn => vm = vn.attrs.model,
    view: _vn => m('', render(vm))
  }

  function render(model: ICheckboxItem[]) {
    if (!model) return null;
    return model.map(item => m(checkboxItem, { model: item }));
  }
}