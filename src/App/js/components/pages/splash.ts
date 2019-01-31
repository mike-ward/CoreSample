import m from 'mithril';
import constants from '../../services/constants-service';

export const splash: m.FactoryComponent = () => {
  let timer: any;

  return {
    view: splashView,
    oninit: () => timer = setInterval(updateTime, 1000),
    onremove: () => clearInterval(timer),
  }
}

function splashView() {
  return m('.hero',
    m('.hero-body',
      m('.container.has-text-centered',
        m('h1.title', { style: 'margin-top:5em' }, constants.appTitle),
        m('h2.subtitle',
          m('button.button', { style: 'margin:1em 0', href: 'news', oncreate: m.route.link }, 'Get Started'),
          m('', new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())
        )
      )),
  )
}

function updateTime() {
  m.redraw();
}