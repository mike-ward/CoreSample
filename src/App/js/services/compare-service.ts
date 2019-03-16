export function naturalStringCompare(a: string, b: string): number {
  return naturalStringCompareImplementation(a, b, undefined);
}

export function naturalStringCompareIgnoreCase(a: string, b: string): number {
  return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
}

const locale = 'en';

function naturalStringCompareImplementation(a: string, b: string, options: any): number {
  if (a === null && b === null) return 0;
  if (a === null) return -1;
  if (b === null) return 1;

  if (isAlpha(a) && isAlpha(b)) return a.localeCompare(b, locale, options)
  if (isNumeric(a) && isNumeric(b)) return +a - +b;

  while (true) {
    const ac = getChunk(a);
    const bc = getChunk(b);

    const compare = ac.isnum && bc.isnum
      ? +ac.value - +bc.value
      : ac.value.localeCompare(bc.value, locale, options);

    if (compare) return compare;

    a = a.substring(ac.count);
    b = b.substring(bc.count);
    if (a.length === 0 && b.length === 0) return 0;
  }
}

const zero = 48;
const nine = 57;
const comma = 44;
const decimal = 46;

function getChunk(str: string) {
  let count = 0;
  let chars = '';
  let isnum: boolean;
  let classified = false;
  const len = str.length;

  while (count < len) {
    const ch = str.charAt(count++);
    const code = ch.charCodeAt(0); // comparing numbers faster

    if (classified) {
      if (isnum && code === comma) continue;
      const digitOrDecimal = code >= zero && code <= nine || code === decimal;
      if (!isnum && digitOrDecimal || isnum && !digitOrDecimal) break;
    }
    else {
      classified = true;
      isnum = code >= zero && code <= nine;
    }

    chars += ch;
  }

  return {
    value: chars,
    isnum: isnum && isNumeric(chars),
    count: count
  }
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isAlpha(s: string) {
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    const code = s.charCodeAt(i);
    if (code >= zero && code <= nine) return false;
  }
  return true;
}