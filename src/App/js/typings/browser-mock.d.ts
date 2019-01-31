/// <reference path="../node_modules/mithril-query/mithril-query.d.ts"/>
declare var browser: (env?: any) => {};

declare module 'mithril/test-utils/browserMock' {
  export = browser;
}