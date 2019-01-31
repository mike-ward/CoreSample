import m from 'mithril';

const modalContainerId = 'modal-container-unique-id';

export function modal(
  render: () => m.Children,
  attrs?: m.Attributes
) {
  const modalContainer = document.createElement('div');
  modalContainer.id = modalContainerId;
  document.body.appendChild(modalContainer);

  try {
    const modalComponent = {
      oncreate: () => {
        const el = modalContainer.querySelector('input,button') as HTMLElement;
        if (el) el.focus()
        if (attrs && attrs.tabindex === 0) (modalContainer.firstElementChild as any).focus();
      },

      view: () =>
        m('.modal is-active', attrs,
          m('.modal-background'),
          m('.modal-content', render()))
    }

    m.mount(modalContainer, modalComponent);
  }
  catch (e) {
    closeModal();
    throw e;
  }
}

export function closeModal() {
  const container = document.getElementById(modalContainerId);
  m.mount(container, null);
  container.remove();
}