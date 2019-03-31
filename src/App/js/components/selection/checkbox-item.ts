import m from 'mithril';
import constants from '../../services/constants-service';

export interface ICheckboxItem {
  name: string;
  value: string;
  checked: boolean;
  onchange?: (e: Event) => void;
}

export interface ICheckboxItemAttrs extends m.Attributes {
  model: ICheckboxItem
}

export const checkboxItem: m.FactoryComponent<ICheckboxItemAttrs> = () => {

  return {
    view: vn => render(vn.attrs.model)
  }
}

function render(item: ICheckboxItem) {
  return m('',
    m('label.checkbox',
      renderCheckbox(item)),
      constants.html.nbsp + item.name
  );
}

function renderCheckbox(item: ICheckboxItem) {
  return m('input[type=checkbox]', {
    checked: item.checked,
    onchange: (e: Event) => {
      item.checked = (e.target as HTMLInputElement).checked;
      if (item.onchange) item.onchange(e);
    }
  });
}