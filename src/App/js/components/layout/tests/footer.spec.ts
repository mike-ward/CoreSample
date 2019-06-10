import o from 'mithril/ospec';
import '../../../browser-mock';
import mq from 'mithril-query';
import { footer } from '../footer';

o('footer should contain div.foot', () => {
  const out = mq(footer.view(null));
  out.should.have(1, 'div.foot');
});