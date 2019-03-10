import m from 'mithril';
import constants from '../../services/constants-service';
import { cssStylesAdd } from '../../services/css-service';

// language=CSS
cssStylesAdd(`.foot{margin-top:5rem;}`);

export const footer: m.Component = {
  view: footerView
}

function footerView() {
  return m('.foot',
    m('hr'),
    m('', constants.copyright),
    m('', 'v: ' + constants.version)
  );
}