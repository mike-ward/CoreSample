import { compareService } from '../compare-service';

test('naturalStringComparer should understand numbers', () => {
  expect(compareService.naturalStringCompare('9.01A', '9.1A')).toBeLessThan(0);
  expect(compareService.naturalStringCompare('A9.01A', 'A9.1A')).toBeLessThan(0);
  expect(compareService.naturalStringCompare('A9.01A', 'B9.1A')).toBeLessThan(0);
  expect(compareService.naturalStringCompare('9,000', '9000')).toBe(0);
  expect(compareService.naturalStringCompare('9,001', '9,010')).toBeLessThan(0);
  expect(compareService.naturalStringCompare('9,010', '9,001')).toBeGreaterThan(0);
  expect(compareService.naturalStringCompare('B', 'A')).toBeGreaterThan(0);
})