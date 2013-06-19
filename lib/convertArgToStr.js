'use strict';

/*
function toFloatHex(args, argIdx, fd) {
    return parseFloat(args[argIdx]).toString(16);
}
*/

exports.convertArgToStr = function(arg, fd) {

    if (typeof fd !== 'object' || fd.conversion === undefined || arg === undefined)
        return '';

    // Get the target format of the conversion character, so we can work with it.
    var convResult;

    switch (fd.conversion) {
    case '%':       // A % followed by another % character will write a single %
        return '%';
    case 'a':       // hexadecimal floating point, lowercase
    case 'A':       // hexadecimal floating point, uppercase
    case 'e':       // Scientific notation (mantissa/exponent), lowercase  3.9265e+2
    case 'E':       // Scientific notation (mantissa/exponent), uppercase  3.9265E+2
    case 'f':       // Decimal floating point, lowercase   392.65
    case 'F':       // Decimal floating point, uppercase   392.65
    case 'g':       // Use the shortest representation: %e or %f
    case 'G':       // Use the shortest representation: %E or %F
        convResult = parseFloat(arg);
        fd.sign = (convResult >= 0) ? '+' : '-';
        fd.sign2 = (convResult >= 0) ? ' ' : '-';
        break;
    case 'c':       // character
        convResult = String.fromCharCode(parseInt(arg, 10));
        break;
    case 'd':       // Signed decimal integer
    case 'i':       // signed decimal
    case 'o':       // Unsigned octal
    case 'u':       // Unsigned decimal integer
    case 'x':       // Unsigned hexadecimal integer lowercase
    case 'X':       // Unsigned hexadecimal integer (uppercase)
        convResult = parseInt(arg, 10);
        fd.sign = (convResult >= 0) ? '+' : '-';
        fd.sign2 = (convResult >= 0) ? ' ' : '-';
        break;
    case 'n':       // do nothing
    case 'p':       // do nothing
        return '';
    case 's':       // string
    case 'S':       // string
        convResult = String(arg);
        break;
    default:        // error case
        break;
    }

    // create the field by width, if specified
    switch (fd.conversion) {
    case 'f':       // Decimal floating point, lowercase   392.65
    case 'F':       // Decimal floating point, uppercase   392.65
    case 'a':       // hexadecimal floating point, lowercase
    case 'A':       // hexadecimal floating point, uppercase
    case 'e':       // Scientific notation (mantissa/exponent), lowercase  3.9265e+2
    case 'E':       // Scientific notation (mantissa/exponent), uppercase  3.9265E+2
    case 'g':       // Use the shortest representation: %e or %f
    case 'G':       // Use the shortest representation: %E or %F
        convResult = toFloat(convResult, fd);
        break;
    case 'c':       // character
        break;
    case 'd':       // Signed decimal integer
    case 'i':       // signed decimal
    case 'o':       // Unsigned octal
    case 'u':       // Unsigned decimal integer
    case 'x':       // Unsigned hexadecimal integer lowercase
    case 'X':       // Unsigned hexadecimal integer (uppercase)
        convResult = toInt(convResult, fd);
        break;
    case 'n':       // do nothing
    case 'p':       // do nothing
        return '';
    case 's':       // string
    case 'S':       // string
        break;
    default:        // error case
        break;
    }

    return convResult;
};

function toInt(arg, fd) {

    // remove fractional part of value, if any - we don't need it
    // and remove the sign, we'll add it back later, if needed
    arg = Math.abs(Math.floor(arg));

    var i;
    var radix = fd.conversion.toLowerCase() === 'a' ? 16 : 10;
    var convResult = arg.toString(radix);

    // do we need to pad due to field with?
    if (fd.fieldWidth && fd.fieldWidth > convResult.length) {
        var pad = fd.fieldWidth - convResult.length;
        if (fd.flags.leftJustified) {
            pad = fd.precision - convResult.length;
            for (i=0; i<pad; i++) convResult = '0' + convResult;
            pad = fd.fieldWidth - convResult.length;
            if (fd.flags.forceSign || fd.flags.showNegSign) pad--;
            for (i=0; i<pad; i++) convResult += ' ';
            // handle cases where we need to add a sign
            if (fd.flags.forceSign)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;
        } else if (fd.flags.leadingZeros) {
            pad = fd.fieldWidth - convResult.length;
            if (fd.flags.forceSign || fd.flags.showNegSign) pad--;
            for (i=0; i<pad; i++) convResult = '0' + convResult;
            // handle cases where we need to add a sign
            if (fd.flags.forceSign)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;
        } else if (fd.precision > convResult.length) {
            pad = fd.precision - convResult.length;
            for (i=0; i<pad; i++) convResult = '0' + convResult;
            // handle cases where we need to add a sign
            if (fd.flags.forceSign)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;

            pad = fd.fieldWidth - convResult.length;
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
        } else {
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
        }
    }

    if (fd.conversion === 'X' || fd.conversion === 'D' || fd.conversion === 'O' ||
        fd.conversion === 'I' || fd.conversion === 'U')
        convResult = convResult.toUpperCase();

    return convResult;
}

function toFloat(arg, fd) {
    if (fd.flags.altNumeric && !fd.precision)
        fd.precision = 6;

    var i;
    var radix = fd.conversion.toLowerCase() === 'a' ? 16 : 10;

    if (fd.precision !== undefined) {
        var round = radix === 16 ? 0.8 : 0.5;
        for (i=0; i<fd.precision; i++) {
            round /= radix;
        }
        arg += round;
    }

    var convResult = arg.toString(radix);

    if (fd.precision > 0) {
        var p = convResult.indexOf('.');
        if (p === -1) {
            convResult += '.';
            for (i=0; i<fd.precision; ++i) convResult += '0';
        } else {
            ++p;    // skip past the '.'
            var start = 0;
            var per = fd.precision+1;
            if (per > 0) {
                while (--per && p < convResult.length && isValidDigit(convResult[p], radix))
                    p++;
            }
            convResult = convResult.substring(start, p);
        }
    }

    // handle cases where we need to add a sign
    if (fd.flags.forceSign)
        convResult = fd.sign + convResult;
    else if (fd.flags.showNegSign)
        convResult = fd.sign2 + convResult;

    // do we need to pad due to field with?
    if (fd.fieldWidth && fd.fieldWidth > convResult.length) {
        var pad = fd.fieldWidth - convResult.length;
        if (fd.flags.leftJustified)
            for (i=0; i<pad; i++) convResult += ' ';
        else if (fd.flags.leadingZeros)
            for (i=0; i<pad; i++) convResult = '0' + convResult;
        else
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
    }

    if (fd.conversion === 'A' || fd.conversion === 'F' || fd.conversion === 'G')
        convResult = convResult.toUpperCase();

    return convResult;
}

function isValidDigit(digit, radix) {
    if (typeof digit !== 'string' && digit.length !== 1)
        return false;

    if (typeof radix !== 'number' && (radix === 16 || radix === 10 ||
        radix === 8 || radix === 2))
        return false;

    var ldigit = digit.toLowerCase();

    if (radix === 16 && ((ldigit >= '0' && ldigit <= '9') ||
        (ldigit >= 'a' && ldigit <= 'f')))
        return true;

    if (radix === 10 && ldigit >= '0' && ldigit <= '9')
        return true;

    if (radix === 8 && ldigit >= '0' && ldigit <= '7')
        return true;

    if (radix === 2 && (ldigit === '0' || ldigit === '1'))
        return true;

    return false;
}
