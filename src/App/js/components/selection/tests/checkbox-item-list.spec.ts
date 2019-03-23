import mq from 'mithril-query';
import '../../../browser-mock';
import { checkboxItemList } from '../checkbox-item-list';

test('checkboxItemList should contain list of checkbox items', () => {
  const items = [
    { name: 'item1', value: 'value1', checked: false },
    { name: 'item2', value: 'value2', checked: true },
    { name: 'item3', value: 'value3', checked: false },
    { name: 'item4', value: 'value4', checked: true }
  ];

  const out = mq(checkboxItemList, { model: items });
  out.should.have(4, 'label.checkbox');
  out.should.have(4, 'input[type=checkbox]');
  out.should.have(2, 'input[checked]');
})