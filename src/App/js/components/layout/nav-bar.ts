import m from 'mithril';
import { userBar } from './user-bar';
import constants from '../../services/constants-service';

export const navBar = {
  view: navBarView
}

function navBarView() {
  return m('nav.navbar.is-info[role="navigation"][aria-label="main navigation"]',
    m('.navbar-brand',
      m('a.navbar-item[href=/]', { oncreate: m.route.link, style: 'font-size:x-large' }, constants.appTitle),
      hamburger()),
    m('#my-navbar.navbar-menu',
      m('.navbar-end', links(), m(userBar)))
  )
}

function links() {
  const options = {
    items: [
      { name: 'News', link: 'news' },
      { name: 'Markets', link: 'markets' },
      { name: 'Stocks', link: 'stocks' },
      { name: 'Modals', link: 'modals' }
    ]
  }
  return options.items
    .map((item: any) => m('a.navbar-item',
      {
        href: item.link,
        oncreate: m.route.link,
        className: isActiveLink(m.route.get(), item.name) ? 'is-active' : null
      }, item.name));
}

function hamburger() {
  return m('a',
    {
      id: 'my-hamburger',
      className: 'navbar-burger burger',
      onclick: () => toggle(['my-navbar', 'my-hamburger']),
      role: 'button',
      'aria-expanded': false,
      'aria-label': 'menu'
    },
    [
      m("span[aria-hidden='true']"),
      m("span[aria-hidden='true']"),
      m("span[aria-hidden='true']")
    ]
  )
}

function toggle(ids: string[]) {
  for (const id of ids) {
    const el = document.getElementById(id);
    el.classList.toggle('is-active');
  }
}

function isActiveLink(route: string, name: string) {
  return route && route.toLowerCase().indexOf(name.toLowerCase()) >= 0
}