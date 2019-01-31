import m from 'mithril';
import constants from '../../../services/constants-service';
import { cssStylesAdd } from '../../../services/css-service';

cssStylesAdd(`form.login-form{width:20rem;margin:5rem auto}`);

export const login = {
  view: view,
  oncreate: () => document.getElementById('email').focus()
}

function view() {
  return m('form.login-form',
    m('.title.is-4', `${constants.appTitle} Login`),
    m('.field',
      m("label.label[for='email']", 'Email'),
      m('.control', m('input.input[id="email"][type="email"]'))),
    m('.field',
      m('label.label[for="password"]', 'Password'),
      m('.control', m('input.input[id="password"][type="password"]'))),
    m('.field',
      m('.control', m('button.button.is-primary[type="submit"]', 'Log in')))
  );
}