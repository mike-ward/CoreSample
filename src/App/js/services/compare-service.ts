export const compareService = {
  naturalStringCompare: naturalStringCompare,
  naturalStringCompareIgnoreCase: naturalStringCompareIgnoreCase,
  locale: () => locale
}

const locale = 'en';
const zero = 48;
const nine = 57;
const comma = 44;
const decimal = 46;
const IsNumber = (a: any) => !isNaN(a);

function naturalStringCompare(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, undefined);
}

function naturalStringCompareIgnoreCase(a: string | number, b: string | number): number {
  return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
}

function naturalStringCompareImplementation(a: string | number, b: string | number, options: any): number {
  enum Classification { Alpha, Number }
  type Chunk = { chars: string, classification: Classification, count: number };

  function getChunk(str: string): Chunk {
    let count = 0;
    let chars = '';
    let classification;
    let classified = false;
    const len = str.length;

    // loop and index for performance
    while (count < len) {
      const ch = str.charAt(count++);
      const code = ch.charCodeAt(0);

      if (classified) {
        if (code === comma && classification === Classification.Number) continue;
        const digitOrDecimal = code >= zero && code <= nine || code === decimal;
        if (digitOrDecimal && classification === Classification.Alpha) break;
        if (!digitOrDecimal && classification === Classification.Number) break;
      }
      else {
        classified = true;
        classification = code >= zero && code <= nine ? Classification.Number : Classification.Alpha;
      }

      chars += ch;
    }

    return { chars: chars, classification: classification, count: count };
  }

  while (true) {
    if (a === null && b === null) return 0;
    if (a === null) return -1;
    if (b === null) return 1;
    if (IsNumber(a) && IsNumber(b)) return +a - +b;

    a = a.toString();
    b = b.toString();
    if (a.length === 0 && b.length === 0) return 0;

    const ac = getChunk(a);
    const bc = getChunk(b);

    if (ac.classification === Classification.Number
      && bc.classification === Classification.Number
      && IsNumber(ac.chars)
      && IsNumber(bc.chars)) {
      const compare = +ac.chars - +bc.chars;
      if (compare < 0) return -1;
      if (compare > 0) return 1;
    }
    else {
      const result = ac.chars.localeCompare(bc.chars, locale, options);
      if (result !== 0) return result;
    }

    a = a.substring(ac.count);
    b = b.substring(bc.count);
  }
}