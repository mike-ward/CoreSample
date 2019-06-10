declare let global: any;
import browser from 'mithril/test-utils/browserMock';
global.window = browser();
global.document = window.document;