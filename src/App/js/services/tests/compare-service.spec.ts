import { naturalStringCompare } from '../compare-service';

test('naturalStringComparer should understand embedded numbers', () => {
  expect(naturalStringCompare('9.01A', '9.1A')).toBeLessThan(0);
  expect(naturalStringCompare('A9.01A', 'A9.1A')).toBeLessThan(0);
  expect(naturalStringCompare('A9.01A', 'B9.1A')).toBeLessThan(0);
  expect(naturalStringCompare('9,000', '9000')).toBe(0);
  expect(naturalStringCompare('9,001', '9,010')).toBeLessThan(0);
  expect(naturalStringCompare('9,010', '9,001')).toBeGreaterThan(0);
  expect(naturalStringCompare('B', 'A')).toBeGreaterThan(0);
  expect(naturalStringCompare('125.6', '92.7')).toBeGreaterThan(0);
  expect(naturalStringCompare('1,000,000', '1000000')).toBe(0);
  expect(naturalStringCompare(null, '1000000')).toBeLessThan(0);
  expect(naturalStringCompare('1000000', null)).toBeGreaterThan(0);
  expect(naturalStringCompare(null, null)).toBe(0);
  expect(naturalStringCompare(28, 29)).toBeLessThan(0);
  expect(naturalStringCompare(28, '29')).toBeLessThan(0);
  expect(naturalStringCompare('Day -7', 'Day 12')).toBeLessThan(0);
})