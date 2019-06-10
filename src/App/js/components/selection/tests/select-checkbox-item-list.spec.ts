import o from 'mithril/ospec';
import mq from 'mithril-query';
import '../../../browser-mock';
import { selectCheckboxItemList } from '../select-checkbox-item-list';

o('selectChecboxItemList should contains selectAll checkbox and items', () => {
  const model = {
    selectAll: true,
    items: [
      { name: 'item1', value: 'value1', checked: false },
      { name: 'item2', value: 'value2', checked: true },
      { name: 'item3', value: 'value3', checked: false },
      { name: 'item4', value: 'value4', checked: true }
    ]
  }

  const out = mq(selectCheckboxItemList, { model: model });
  out.should.have(5, 'label.checkbox');
  out.should.contain('Select All');
  out.should.have(3, 'input[checked]');
})