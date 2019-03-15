export const compareService = {
  naturalStringCompare: naturalStringCompare,
  naturalStringCompareIgnoreCase: naturalStringCompareIgnoreCase,
  locale: () => locale
}

function naturalStringCompare(a: string, b: string): number {
  return naturalStringCompareImplementation(a, b, undefined);
}

function naturalStringCompareIgnoreCase(a: string, b: string): number {
  return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
}

const locale = 'en';

function naturalStringCompareImplementation(a: string, b: string, options: any): number {
  while (true) {
    if (a === null && b === null) return 0;
    if (a === null) return -1;
    if (b === null) return 1;
    if (!hasDigits(a) && !hasDigits(b)) return a.localeCompare(b, locale, options)
    if (isNumber(a) && isNumber(b)) return +a - +b;

    a = a.toString();
    b = b.toString();
    if (a.length === 0 && b.length === 0) return 0;

    const ac = getChunk(a);
    const bc = getChunk(b);

    if (ac.isnum && bc.isnum) {
      const compare = +ac.value - +bc.value;
      if (compare < 0) return -1;
      if (compare > 0) return 1;
    }
    else {
      const result = ac.value.localeCompare(bc.value, locale, options);
      if (result !== 0) return result;
    }

    a = a.substring(ac.count);
    b = b.substring(bc.count);
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
    const code = ch.charCodeAt(0); // comparing numbers is considerably faster

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
    isnum: isnum && isNumber(chars),
    count: count
  }
}

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function hasDigits(s: string) {
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    const code = s.charCodeAt(i);
    if (code >= zero && code <= nine) return true;
  }
  return false;
}