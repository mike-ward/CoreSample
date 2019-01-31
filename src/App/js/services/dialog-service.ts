import m from 'mithril';
import constants from './constants-service';
import { cssStylesAdd } from './css-service'
import { modal, closeModal } from './modal-service';

cssStylesAdd(
  `.message-foot{border-top:1px solid gainsboro;padding:.5em 1rem;text-align:right}
   .message-foot button{margin:0 .3rem;min-width:5rem}`);

function closeDialog(result: () => void) {
  closeModal();
  result();
}

export function msg(message: string | m.Vnode, title?: string) {
  return new Promise((resolve) => {
    const attrs = {
      style: { cursor: 'pointer' },
      tabindex: 0, // needed to capture keyboard events on div
      onclick: () => closeDialog(resolve),
      onkeyup: (e: KeyboardEvent) => { if (['Space', 'Escape', 'Enter'].some(code => code === e.code)) closeDialog(resolve) }
    }

    modal(() =>
      m(`.message.is-link`,
        m('.message-header', title || constants.appTitle),
        m('.message-body', message)
      ),
      attrs);
  });
}

export function yesNo(message: string | m.Vnode, title?: string) {
  return new Promise((resolve, reject) => {
    modal(() =>
      m(`.message.is-link`,
        m('.message-header', title || constants.appTitle),
        m('.message-body', message),
        m('.message-foot',
          m('button.button', { onclick: () => closeDialog(resolve) }, 'Yes'),
          m('button.button', { onclick: () => closeDialog(reject) }, 'No')
        )));
  });
}

export function yesNoCancel(message: string | m.Vnode, title?: string) {
  return new Promise((resolve, reject) => {
    modal(() =>
      m(`.message.is-link`,
        m('.message-header', title || constants.appTitle),
        m('.message-body', message),
        m('.message-foot',
          m('button.button', { onclick: () => closeDialog(() => resolve(true)) }, 'Yes'),
          m('button.button', { onclick: () => closeDialog(() => resolve(false)) }, 'No'),
          m('button.button', { onclick: () => closeDialog(reject) }, 'Cancel')
        )));
  });
}

export function ask(question: string | m.Vnode, value?: string, title?: string) {
  return new Promise((resolve, reject) => {
    let answer = value || '';

    modal(() =>
      m(`.message.is-link`,
        m('.message-header', title || constants.appTitle),
        m('.message-body',
          m('p.content', question),
          m('input.input[type="text"]', {
            value: answer,
            oninput: function () { answer = this.value },
            style: { width: '80%' }
          })),
        m('.message-foot',
          m('button.button', { onclick: () => closeDialog(() => resolve(answer)) }, 'OK'),
          m('button.button', { onclick: () => closeDialog(reject) }, 'Cancel')
        )))
  })
}