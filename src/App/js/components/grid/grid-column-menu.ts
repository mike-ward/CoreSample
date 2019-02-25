import m from 'mithril';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
import { IGridColumnMenu } from './grid-types';
import { popupId } from '../../services/app-service';

cssStylesAdd(
  `.app-grid-column-menu-icon { padding-right: .3rem; display: inline-block; float: right; color: ${constants.color.dim1} }
   .app-grid th:hover > .app-grid-column-menu-icon { color:${constants.color.dim2} }
   .app-grid-column-menu-icon:hover { color: ${constants.color.text} !important; }

   .app-grid-column-menu { position: absolute; border: ${constants.border.thin}; background-color: ${constants.color.back}  }
   .app-grid-column-menu-head { padding: .5rem; }
  `);

export function gridColumnMenuFactory(): IGridColumnMenu {
  const model = {
    top: '0',
    left: '0',
    popupId: Math.random(),
    currentTarget: null as EventTarget
  }

  return { // type this later
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
        display: popupId() === model.popupId ? 'block' : 'none',
        top: model.top,
        left: model.left
      }

      const vnode =
        m('.app-grid-column-menu', { style: styles },
          head()
        );
      return vnode;
    }

    function head() {
      return m('.app-grid-column-menu-head',
        'this space for rent');
    }
  }

  function showColumnMenu(ev: Event) {
    ev.stopPropagation();
    showState(ev.currentTarget);
    placement(ev.currentTarget as HTMLElement)
  }

  function placement(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    model.top = rect.bottom + 'px';
    model.left = rect.left + 'px';
  }

  function showState(currentTarget: EventTarget) {
    if (currentTarget !== model.currentTarget || popupId() !== model.popupId) {
      popupId(model.popupId);
      model.currentTarget = currentTarget;
    }
    else {
      popupId(0);
      model.currentTarget = null;
    }
  }
}
