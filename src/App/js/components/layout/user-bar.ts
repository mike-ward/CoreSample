import m from 'mithril';

export const userBar = {
  view: userBarView
};

function userBarView() {
  const pageData = (window as any).pageData;
  const isAdmin = pageData && pageData.isAdmin;

  return [
    isAdmin ? m('a.navbar-item', { href: 'admin/dashboard', oncreate: m.route.link }, 'Admin') : '',
    m('a.navbar-item', { href: 'account/login', oncreate: m.route.link }, 'Login')
  ]
}