import m from 'mithril';
import { cssStylesAdd } from '../../services/css-service';

cssStylesAdd(``);

export const popup: m.FactoryComponent = () => {
  return {
    view: popupView
  }

  function popupView(_v: m.Vnode) {
    return m('.panel');
  }
}