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

    // create the field by width, if specified
    switch (fd.conversion) {
    case '%':
        convResult = '%';
        break;
    case 'f':       // Decimal floating point, lowercase   392.65
    case 'F':       // Decimal floating point, uppercase   392.65
    case 'a':       // hexadecimal floating point, lowercase
    case 'A':       // hexadecimal floating point, uppercase
    case 'e':       // Scientific notation (mantissa/exponent), lowercase  3.9265e+2
    case 'E':       // Scientific notation (mantissa/exponent), uppercase  3.9265E+2
        convResult = parseFloat(arg);
        fd.sign = (convResult >= 0) ? '+' : '-';
        fd.sign2 = (convResult >= 0) ? ' ' : '-';
        convResult = toFloat(convResult, fd);
        break;
    case 'g':       // Use the shortest representation: %e or %f
    case 'G':       // Use the shortest representation: %E or %F
        fd.conversion = fd.conversion === 'g' ? 'e' : 'E';
        convResult = parseFloat(arg);
        fd.sign = (convResult >= 0) ? '+' : '-';
        fd.sign2 = (convResult >= 0) ? ' ' : '-';
        convResult = toFloat(convResult, fd);
        fd.conversion = fd.conversion === 'e' ? 'f' : 'F';
        var convResult2 = parseFloat(arg);
        convResult2 = toFloat(convResult2, fd);
        if (convResult2.length < convResult.length)
            convResult = convResult2;
        break;
    case 'c':       // character
    case 'C':       // character
        if (typeof arg === 'number')
            convResult = String.fromCharCode(parseInt(arg, 10));
        else
            convResult = String(arg.substring(0,1));
        convResult = toStr(convResult, fd);
        break;
    case 's':       // string
    case 'S':       // string
    case 't':       // string
        convResult = String(arg);
        convResult = toStr(convResult, fd);
        break;
    case 'd':       // Signed decimal integer
    case 'D':       // Signed decimal integer
    case 'i':       // signed decimal
    case 'I':       // signed decimal
    case 'o':       // Unsigned octal
    case 'O':       // Unsigned octal
    case 'u':       // Unsigned decimal integer
    case 'U':       // Unsigned decimal integer
    case 'x':       // Unsigned hexadecimal integer lowercase
    case 'X':       // Unsigned hexadecimal integer (uppercase)
    case 'b':       // Unsigned hexadecimal integer (uppercase)
    case 'B':       // Unsigned hexadecimal integer (uppercase)
        convResult = parseInt(arg, 10);
        fd.sign = (convResult >= 0) ? '+' : '-';
        fd.sign2 = (convResult >= 0) ? ' ' : '-';
        convResult = toInt(convResult, fd);
        break;
    case 'n':       // do nothing
    case 'p':       // do nothing
        convResult = '';
        break;
    case 'j':
        convResult = JSON.stringify(arg);
        break;
    default:        // error case
        convResult = '';
        break;
    }

    return convResult;
};

function toStr(convResult, fd) {

    var i;
    var pad;

    // if a charcter, we only take the first character
    if (fd.conversion === 'c' && convResult.length > 1)
        convResult = convResult.substring(0);
    // precision means how mny characters from the string we display
    else if (typeof fd.precision === 'number' && fd.precision < convResult.length)
        convResult = convResult.substring(0, fd.precision);

    // do we need to pad due to field with?
    if (fd.fieldWidth && fd.fieldWidth > convResult.length) {
        pad = fd.fieldWidth - convResult.length;
        if (fd.flags.leftJustified) {
            for (i=0; i<pad; i++) convResult += ' ';
        } else {
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
        }
    }

    if (fd.conversion === 'S' || fd.conversion === 'C')
        convResult = convResult.toUpperCase();
    else if (fd.conversion === 't')
        convResult = convResult.toLowerCase();

    return convResult;
}

function toInt(arg, fd) {

    var isNeg = arg < 0 && fd.conversion.toLowerCase() !== 'u' ? true : false;

    // remove fractional part of value, if any - we don't need it
    // and remove the sign, we'll add it back later, if needed
    arg = Math.abs(Math.floor(arg));

    var i;
    var radix = 10;
    switch (fd.conversion.toLowerCase()) {
    case 'x':
        radix = 16;
        break;
    case 'o':
        radix = 8;
        break;
    case 'b':
        radix = 2;
        break;
    }

    var convResult = arg.toString(radix);
    if (fd.flags.altNumeric && arg !== 0) {
        switch (fd.conversion) {
        case 'x':
            convResult = '0x' + convResult;
            break;
        case 'X':
            convResult = '0X' + convResult;
            break;
        case 'o':
        case 'O':
            convResult = '0' + convResult;
            break;
        case 'b':
            convResult = 'b' + convResult;
            break;
        case 'B':
            convResult = 'B' + convResult;
            break;
        }
    }

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
            if (fd.flags.forceSign || isNeg)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;
        } else if (fd.flags.leadingZeros) {
            pad = fd.fieldWidth - convResult.length;
            if (fd.flags.forceSign || fd.flags.showNegSign) pad--;
            for (i=0; i<pad; i++) convResult = '0' + convResult;
            // handle cases where we need to add a sign
            if (fd.flags.forceSign || isNeg)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;
        } else if (fd.precision > convResult.length) {
            pad = fd.precision - convResult.length;
            for (i=0; i<pad; i++) convResult = '0' + convResult;
            // handle cases where we need to add a sign
            if (fd.flags.forceSign || isNeg)
                convResult = fd.sign + convResult;
            else if (fd.flags.showNegSign)
                convResult = fd.sign2 + convResult;
            pad = fd.fieldWidth - convResult.length;
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
        } else {
            for (i=0; i<pad; i++) convResult = ' ' + convResult;
        }
    } else if (isNeg) {
        convResult = fd.sign + convResult;
    }

    if (fd.conversion === 'X' || fd.conversion === 'D' || fd.conversion === 'O' ||
        fd.conversion === 'I' || fd.conversion === 'U')
        convResult = convResult.toUpperCase();

    return convResult;
}

function toFloat(arg, fd) {
    if (fd.flags.altNumeric && (!fd.precision || fd.precision < 1))
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
