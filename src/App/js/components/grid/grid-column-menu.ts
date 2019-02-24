import m from 'mithril';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
import { IGridColumnMenu } from './grid-types';

cssStylesAdd(
  `.app-grid-column-menu-icon { padding-right: .3rem; display: inline-block; float: right; color: ${constants.color.dim1} }
   .app-grid th:hover > .app-grid-column-menu-icon { color:${constants.color.dim2} }
   .app-grid-column-menu-icon:hover { color: ${constants.color.text} !important }

   .app-grid-column-menu { position: absolute; border: ${constants.border.thin}; background-color: ${constants.color.back}  }
   .app-grid-column-menu-head { padding: .5rem; }
  `);

export function gridColumnMenuFactory(): IGridColumnMenu {
  const model = {
    show: false,
    top: 0,
    left: 0
  }

  return {
    gridColumnMenuIcon: gridColumnMenuIcon,
    gridColumnMenu: gridColumnMenu
  }

  function gridColumnMenuIcon(): m.Vnode {
    return m('.app-grid-column-menu-icon', { onclick: showColumnMenu }, '☰');
  }

  function gridColumnMenu(): m.Component {
    return {
      view: view
    }

    function view() {
      const styles = {
        display: model.show ? 'block' : 'none',
        top: model.top + 'px',
        left: model.left + 'px'
      }

      const vnode =
        m('.app-grid-column-menu', { style: styles },
          m('',
            head()
          )
        );
      return vnode;
    }

    function head() {
      return m('.app-grid-column-menu-head',
        'this space for rent');
    }

  }

  function placement(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    model.top = rect.bottom;
    model.left = rect.left;
  }

  function showColumnMenu(ev: Event) {
    ev.stopPropagation();
    model.show = !model.show;
    placement(ev.currentTarget as HTMLElement)
  }
}
