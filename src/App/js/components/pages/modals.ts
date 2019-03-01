import m from 'mithril';
import { ask, msg, yesNo, yesNoCancel } from '../../services/dialog-service';

export const modals: m.Component = {
  view: modalsView
}

function modalsView() {
  return [
    m('.page-title', 'Modals'),
    m('form.columns', examples.map(example => [
      m('.column.is-narrow',
        m('.button.button', { onclick: example.modal }, example.text))
    ]))
  ];
}

var examples = [
  {
    text: 'Message Modal',
    modal: () => msg('Example message modal')
  },
  {
    text: 'Message Modal with Markup',
    modal: () =>
      msg(m('.content',
        m('.subtitle', 'Lorem ipsum'),
        m('blockquote', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, ' +
          'nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, ' +
          'interdum mattis neque.')),
        'Message with Markup')
  },
  {
    text: 'Yes/No Modal',
    modal: () =>
      yesNo('Do you want Oreos?')
        .then(
          () => msg('Then go buy some you lazy bum!'),
          () => msg('Aw shucks!'))
  },
  {
    text: 'Yes/No/Cancel Modal',
    modal: () =>
      yesNoCancel('Do want to retend to save a file?')
        .then(
          (r: boolean) => r ? msg('Answered YES') : msg('Answered NO'),
          () => msg('Answered CANCEL'))
  },
  {
    text: 'Prompt Modal',
    modal: () =>
      ask('What is the answer to life, the universe and everything?', '42', 'Ask a Silly Question')
        .then(
          (answer: string) => msg('You typed ' + answer),
          () => msg('You declined to answer'))
  },
]