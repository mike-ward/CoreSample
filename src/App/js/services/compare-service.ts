export const compareService = {
  compareAny: compareAny,
  naturalStringCompare: naturalStringCompare,
  naturalStringCompareIgnoreCase: naturalStringCompareIgnoreCase,
  locale: () => locale
}

const locale = 'en';

function compareAny(a: any, b: any): number {
  if (a === b) return 0;

  // NaN, and only NaN, will compare unequal to itself,
  // and is more reliable than isNaN(). Adding insult
  // to injury, NaN itself is not a number.
  const aIsNaN = a !== a;
  const bIsNaN = b !== b;

  if (typeof a === 'number' || typeof b === 'number' || aIsNaN || bIsNaN) {
    if (aIsNaN && bIsNaN) return 0;
    if (aIsNaN && !bIsNaN) return -1;
    if (!aIsNaN && bIsNaN) return +1;
    if (a === undefined && b !== undefined) return -1;
    if (a !== undefined && b === undefined) return +1;
    return a - b;
  }

  if (a !== null && b === null) return +1;
  if (a === null && b !== null) return -1;
  return a.localeCompare(b, locale);
}

function naturalStringCompare(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, undefined);
} 

function naturalStringCompareIgnoreCase(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
} 

function naturalStringCompareImplementation(a: string | number, b: string | number, options: any): number {
  enum ClassificationType { Undecided, Alpha, Number }
  type ChunkType = { content: string, classification: ClassificationType, count: number };
  const isDigit = (c: any) => c >= '0' && c <= '9' || c === '.';
  const isNumberLike = (a: any) => !isNaN(a);

  function getChunk(str: string): ChunkType {
    const chars: string[] = [];
    let classification: ClassificationType = ClassificationType.Undecided;
    let count = 0;

    for (const c of str) {
      count++;
      if (classification === ClassificationType.Undecided) {
        classification = isDigit(c) ? ClassificationType.Number : ClassificationType.Alpha;
      }
      else if (classification === ClassificationType.Number && c === ',') {
        continue;
      }
      else {
        const numeric = isDigit(c);
        if (classification === ClassificationType.Alpha && numeric) break;
        if (classification === ClassificationType.Number && !numeric) break;
      }
      chars.push(c);
    }

    return { content: chars.join(''), classification: classification, count: count };
  }

  while (true) {
    if (a === null && b === null) return 0;
    if (a === null) return -1;
    if (b === null) return 1;
    if (isNumberLike(a) && isNumberLike(b)) return +a - +b;

    a = a.toString();
    b = b.toString();
    if (a.length === 0 && b.length === 0) return 0;

    const ac = getChunk(a);
    const bc = getChunk(b);

    if (ac.classification === ClassificationType.Number
      && bc.classification === ClassificationType.Number
      && isNumberLike(ac.content) && isNumberLike(bc.content)) {
      const compare = +ac.content - +bc.content;
      if (compare < 0) return -1;
      if (compare > 0) return 1;
    }
    else {
      const result = ac.content.localeCompare(bc.content, locale, options);
      if (result !== 0) return result;
    }

    a = a.substring(ac.count);
    b = b.substring(bc.count);
  }
}

