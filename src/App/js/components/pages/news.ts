import m from 'mithril';
import { dateToLocaleString } from '../../services/convert-service';
import { cssStylesAdd } from '../../services/css-service';
import { decodeHtml } from '../../services/dom-service';
import { loading } from '../loading/loading';

// language=css
cssStylesAdd(
  `.news-item      { margin-bottom: 2rem; max-width: 60rem }
   .news-date-time { font-weight:bold; margin-bottom: 0.5rem }
   .news-title     { font-size:large; font-weight:bold }`);

export const news: m.FactoryComponent = () => {
  let model: IModel;

  return {
    oninit: oninit,
    view: newsView,
    onremove: onremove,
  }

  interface INews {
    url: string;
    headline: string;
    datetime: Date;
    summary: string;
    source: string;
  }

  interface IModel {
    news: INews[]
  }


  function initModel() {
    return {
      news: null as INews[]
    }
  }

  function newsView(): m.Vnode {
    return m('div',
      m('.page-title', 'News'),
      m('div', model.news
        ? model.news.map((item: any) => newsNode(item))
        : m(loading))
    );
  }

  function oninit(): void {
    model = initModel();
    updateNews();
  }

  function onremove() {
    model = initModel();
  }

  function updateNews() {
    m.request({ url: 'api/markets/news', data: Date.now() })
      .then(r => model.news = r as any);
  }

  function newsNode(item: any): m.Vnode {
    const vn = m('.news-item',
      m('', [m('a.news-title', { href: item.url, target: '_blank' } as any, decodeHtml(item.headline))]),
      m('div.news-date-time', dateToLocaleString(item.datetime)),
      m('p', decodeHtml(item.summary)),
      m('p', 'source: ', m('em', decodeHtml(item.source)))
    );

    return vn;
  }
}