import '../../../browser-mock';
import mq from 'mithril-query';
import { footer } from '../footer';

test('footer should contain div.foot', () => {
  const out = mq(footer.view());
  out.should.have(1, 'div.foot');
});