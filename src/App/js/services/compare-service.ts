export function naturalStringCompare(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, undefined);
}

export function naturalStringCompareIgnoreCase(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
}

const locale = 'en';
const commas = /,/g;

function naturalStringCompareImplementation(a: string | number, b: string | number, options: any): number {
  if (a === null) return b === null ? 0 : -1;
  if (b === null) return 1;

  const an = typeof (a) === 'number' ? a : Number(a.replace(commas, ''));
  const bn = typeof (b) === 'number' ? b : Number(b.replace(commas, ''));

  if (Number.isFinite(an) && Number.isFinite(bn)) {
    const cmp = an - bn;
    return cmp < 0 ? -1 : cmp > 0 ? 1 : 0;
  }

  let as = a.toString();
  let bs = b.toString();

  while (true) {
    if (as.length === 0 && bs.length === 0) return 0;

    const ac = getChunk(as);
    const bc = getChunk(bs);

    const compare = ac.finite && bc.finite
      ? ac.num - bc.num
      : ac.chars.localeCompare(bc.chars, locale, options);

    if (compare) return compare > 0 ? 1 : -1;

    as = as.substring(ac.chars.length);
    bs = bs.substring(bc.chars.length);
  }
}

const zero = 48;
const nine = 57;
const minus = 45;
const decimal = 46;

function getChunk(str: string) {
  let chars = '';
  let digits = false;
  let classified = false;

  for (const ch of str) {
    const code = ch.charCodeAt(0);
    const digit = code <= nine && code >= zero || code === decimal;

    if (classified) {
      if (digits !== digit || code === minus) break;
    }
    else if (code !== minus) {
      classified = true;
      digits = digit;
    }

    chars += ch;
  }

  const num = digits ? Number(chars) : NaN;
  const finite = digits && Number.isFinite(num);
  return { chars, num, finite }
}