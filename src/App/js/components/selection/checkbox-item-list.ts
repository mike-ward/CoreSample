import m from 'mithril';
import { ICheckboxItem, checkboxItem } from './checkbox-item';

export interface ICheckboxItemListAttrs extends m.Attributes {
  model: ICheckboxItem[];
}

export const checkboxItemList: m.FactoryComponent<ICheckboxItemListAttrs> = () => {

  return {
    view: vn => m('', render(vn.attrs.model))
  }

  function render(model: ICheckboxItem[]) {
    if (!model) return null;
    return model.map(item => m(checkboxItem, { model: item }));
  }
}