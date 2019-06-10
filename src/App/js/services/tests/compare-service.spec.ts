import o from 'mithril/ospec';
import { naturalStringCompare } from '../compare-service';

o('naturalStringComparer should understand embedded numbers', () => {
  o(naturalStringCompare('9.01A', '9.1A')).equals(-1);
  o(naturalStringCompare('A9.01A', 'A9.1A')).equals(-1);
  o(naturalStringCompare('A9.01A', 'B9.1A')).equals(-1);
  o(naturalStringCompare('9,000', '9000')).equals(0);
  o(naturalStringCompare('9,001', '9,010')).equals(-1);
  o(naturalStringCompare('9,010', '9,001')).equals(1);
  o(naturalStringCompare('B', 'A')).equals(1);
  o(naturalStringCompare('125.6', '92.7')).equals(1);
  o(naturalStringCompare('1,000,000', '1000000')).equals(0);
  o(naturalStringCompare(null, '1000000')).equals(-1);
  o(naturalStringCompare('1000000', null)).equals(1);
  o(naturalStringCompare(null, null)).equals(0);
  o(naturalStringCompare(28, 29)).equals(-1);
  o(naturalStringCompare(28, '29')).equals(-1);
  o(naturalStringCompare('Day -7', 'Day 12')).equals(-1);
})