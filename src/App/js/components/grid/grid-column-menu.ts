import m from 'mithril';
import { cssStylesAdd } from '../../services/css-service';
//import { popup } from '../popup/popup';
import { IGridAttrs } from './grid-types';

cssStylesAdd(
  `.app-grid-column-menu { display: inline-block; float: right; cursor: pointer; color: #ccd }
   .app-grid-column-menu:hover { color: #333 }
   .app-grid-column-menu-icon { padding-right: .3rem; display: inline-block; float: right }
  `);

export const gridColumnMenu: m.FactoryComponent<IGridAttrs> = () => {
  return {
    view: _vn => hamburger()
  }
}

function hamburger() {
  return m('.app-grid-column-menu-icon', '☰');
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