import m from 'mithril';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
//import { popup } from '../popup/popup';
import { IGridAttrs } from './grid-types';

cssStylesAdd(
  `.app-grid-column-menu { padding-right: .3rem; display: inline-block; float: right; color: ${constants.color.thBg} }
   .app-grid th:hover > .app-grid-column-menu { color: ${constants.color.text} }
  `);

export const gridColumnMenu: m.FactoryComponent<IGridAttrs> = () => {
  return {
    view: _vn => hamburger()
  }
}

function hamburger() {
  return m('.app-grid-column-menu', '☰');
}

//function menu() {
//  return m(popup,
//    [
//      hide()
//    ]);
//}

//function hide() {
//  return m('hide');
//}