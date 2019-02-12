import m from 'mithril';
import { cssStylesAdd } from '../../services/css-service';

cssStylesAdd(``);

export const popup = {
  view: popupView
}

function popupView(_v: m.Vnode) {
  return m('.panel');
}