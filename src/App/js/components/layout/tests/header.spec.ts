import '../../../browser-mock';
import mq from 'mithril-query';
import { header } from '../header';

test('header should contain nav', () => {
  const out = mq(header.view(null));
  out.should.have(1, 'nav.navbar');
});