﻿import o from 'mithril/ospec';
import mq from 'mithril-query';
import '../../../browser-mock';
import constants from '../../../services/constants-service';
import { checkboxItem, ICheckboxItem } from '../checkbox-item';

o('checkboxItem should have label and checkbox', () => {
  const item = {
    name: 'item',
    value: 'value',
    checked: true
  } as ICheckboxItem;

  const out = mq(checkboxItem, { model: item });
  out.should.have(1, 'label.checkbox');
  out.should.have(1, 'input[type=checkbox]');
  out.should.have(1, 'input[checked]');
  out.should.contain(constants.html.nbsp + 'item');
})