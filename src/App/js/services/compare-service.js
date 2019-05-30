"use strict";
exports.__esModule = true;
function naturalStringCompare(a, b) {
    return naturalStringCompareImplementation(a, b, undefined);
}
exports.naturalStringCompare = naturalStringCompare;
function naturalStringCompareIgnoreCase(a, b) {
    return naturalStringCompareImplementation(a, b, { sensitivity: 'accent' });
}
exports.naturalStringCompareIgnoreCase = naturalStringCompareIgnoreCase;
var locale = 'en';
var commas = /,/g;
function naturalStringCompareImplementation(a, b, options) {
    if (a === null)
        return b === null ? 0 : -1;
    if (b === null)
        return 1;
    var an = typeof (a) === 'number' ? a : Number(a.replace(commas, ''));
    if (Number.isFinite(an)) {
        var bn = typeof (b) === 'number' ? b : Number(b.replace(commas, ''));
        if (Number.isFinite(bn)) {
            var cmp = an - bn;
            return cmp < 0 ? -1 : cmp > 0 ? 1 : 0;
        }
    }
    var as = a.toString();
    var bs = b.toString();
    while (true) {
        if (as.length === 0 && bs.length === 0)
            return 0;
        var ac = getChunk(as);
        var bc = getChunk(bs);
        var compare = ac.finite && bc.finite
            ? ac.num - bc.num
            : ac.chars.localeCompare(bc.chars, locale, options);
        if (compare)
            return compare > 0 ? 1 : -1;
        as = as.substring(ac.chars.length);
        bs = bs.substring(bc.chars.length);
    }
}
var zero = 48;
var nine = 57;
var minus = 45;
var decimal = 46;
function getChunk(str) {
    var chars = '';
    var digits = false;
    var classified = false;
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var ch = str_1[_i];
        var code = ch.charCodeAt(0);
        var digit = code <= nine && code >= zero || code === decimal;
        if (classified) {
            if (digits !== digit || code === minus)
                break;
        }
        else if (code !== minus) {
            classified = true;
            digits = digit;
        }
        chars += ch;
    }
    var num = digits ? Number(chars) : NaN;
    var finite = digits && Number.isFinite(num);
    return { chars: chars, num: num, finite: finite };
}
