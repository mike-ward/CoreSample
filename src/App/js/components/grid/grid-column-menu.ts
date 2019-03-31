import m from 'mithril';
import stream from 'mithril/stream';
import { popupId } from '../../services/app-service';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';
import { gridFilterSelect } from './grid-filter';
import { IGridColumnMenu, IGridColumnMenuAttrs, IGridModel } from './grid-types';

cssStylesAdd(
  `.app-grid-column-menu-icon                         { padding-right: .3rem; display: inline-block; float: right; color: ${constants.color.dim1} }
   .app-grid th:hover > .app-grid-column-menu-icon    { color:${constants.color.dim2} }
   .app-grid-column-menu-icon:hover                   { color: ${constants.color.text} !important; }

   .app-grid-column-menu                              { position: absolute;
                                                        border: ${constants.border.thin};
                                                        background-color: ${constants.color.back} }
   .app-grid-column-menu-head                         { padding: .5rem; max-height: 25rem; overflow-y: scroll; }
   .app-grid-column-menu-head .selectCheckboxItemList { max-height: 100%; }
   .app-grid-column-menu-hr                           { margin: .3rem }
  `);

export function gridColumnMenuFactory(): IGridColumnMenu {
  const model = {
    top: '0',
    left: '0',
    columnId: '',
    popupId: Math.random(),
    currentTarget: null as EventTarget
  }

  return { // type this later
    gridColumnMenuIcon: gridColumnMenuIcon,
    gridColumnMenu: gridColumnMenu
  }

  function gridColumnMenuIcon(columnId: string): m.Vnode {
    return m('.app-grid-column-menu-icon', {
      onclick: (e: Event) => showColumnMenu(e, columnId)
    }, '☰');
  }

  function gridColumnMenu(): m.Component<IGridColumnMenuAttrs> {
    let gm: stream.Stream<IGridModel>;

    return {
      oninit: vn => gm = vn.attrs.model,
      view: view
    }

    function view() {
      const styles = {
        top: model.top,
        left: model.left
      }

      const vnode =
        popupId() === model.popupId
          ? m('.app-grid-column-menu', { style: styles },
            m('.app-grid-column-menu-head',
              title(model.columnId, gm()),
              m('hr.app-grid-column-menu-hr'),
              m(gridFilterSelect, { columnId: model.columnId, gridModel: gm })
            )
          )
          : null;

      return vnode;
    }
  }

  function title(columnId: string, gridModel: IGridModel) {
    const title = gridModel.columns.find(c => c.id === columnId).name;
    return m('.bold', title);
  }

  function showColumnMenu(ev: Event, columnId: string) {
    ev.stopPropagation();
    model.columnId = columnId;
    showState(ev.currentTarget);
    placement(ev.currentTarget as HTMLElement)
  }

  function placement(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    model.top = window.scrollY + rect.bottom + 'px';
    model.left = window.scrollX + rect.left + 'px';
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