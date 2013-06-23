'use strict';

var convertArgToStr = require('./convertArgToStr').convertArgToStr;


var sprintf = function(format) {

    // Check for format definition
    if (typeof format !== 'string' || format.length === 0)
        return '';

    var args = [];
    var i;

    // If the second arg is an array and there are no more arguments
    // use the array as a list of arguments. Also,
    // re-assign arguments to args[] from arguments[1]
    if (arguments.length === 2 && '[object Array]' === toString.call(arguments[1])) {
        // arguments is an array-like object, not an array
        for (i=0; i<arguments[1].length; ++i) {
            args.push(arguments[1][i]);
        }
    } else {
        // arguments is an array-like object, not an array
        for (i=1; i<arguments.length; ++i) {
            args.push(arguments[i]);
        }
    }

    var nextArg = 0;
    var newStr = '';

    // Iterate over the string, finding the '%' characters
    // which indicate a format decsriptor.
    // FIXME There is a faster way to do this.
    for (i=0; i<format.length; ++i) {
        var fd;
        if (format[i] === '%') {
            fd = parseFormatDescriptor(format, i);

            if (!fd.conversion) continue;

            // check for a field width of '*'
            if (fd.fieldWidth === '*' && typeof args[nextArg] === 'number')
                fd.fieldWidth = Math.abs(Math.floor(args[nextArg++]));

            if (fd.precision === '*' && typeof args[nextArg] === 'number')
                fd.precision = Math.abs(Math.floor(args[nextArg++]));

            if (fd.conversion === '%') {
                newStr += '%';
                i = fd.endPos-1;
                continue;
            } else if (fd.conversion === 'n') {
                if (typeof args[nextArg] === 'object')
                    args[nextArg].sprintf_n = newStr.length;
                nextArg++;
                i = fd.endPos-1;
            } else if (fd.conversion === 'p') {
                i = fd.endPos-1;
                nextArg++;
            } else {
                newStr += convertArgToStr(args[nextArg++], fd);
            }

            if (fd && fd.endPos)
                i = fd.endPos-1;
        } else {
            newStr += format[i];
        }
    }
    return newStr;
};

//var util = require('util');
//var buf = sprintf('%-9.1A\n', 10.19);
//console.log(util.inspect(buf, {colors: true, depth: null}));

function parseFormatDescriptor(formatStr, pos) {

    var fd = {};    // return object

    if (typeof formatStr !== 'string' || pos >= formatStr.length)
        return fd;

    // check argument sanity
    if (typeof pos !== 'number' || typeof formatStr !== 'string' || formatStr.length <= pos)
        return fd;

    if (formatStr[pos] !== '%') return fd;
    fd.startPos = pos;      // startPos is the character position where the '%' is
    if (++pos >= formatStr.length) return fd;   // skip the '%'

    // get the flags
    // Flag    Meaning
    // -       The output is left justified in its field, not right justified (the default).
    // +       Signed numbers will always be printed with a leading sign (+ or -).
    // space   Positive numbers are preceded by a space (negative numbers by a - sign).
    // 0       For numeric conversions, pad with leading zeros to the field width.
    // #       An alternative output form. For o, the first digit will be '0'. For x or X,
    //          "0x" or "0X" will be prefixed to a non-zero result. For e, E, f, F, g and G,
    //          the output will always have a decimal point; for g and G, trailing zeros will
    //          not be removed.
    fd.flags = {};
    fd.flags.leftJustified = false;
    fd.flags.forceSign = false;
    fd.flags.showNegSign = false;
    fd.flags.leadingZeros = false;
    fd.flags.altNumeric = false;

    while (pos < formatStr.length && (formatStr[pos] === '-' || formatStr[pos] === '+' ||
             formatStr[pos] === ' ' || formatStr[pos] === '0' || formatStr[pos] === '#')) {
        switch (formatStr[pos]) {
        case '-':
            fd.flags.leftJustified = true;
            break;
        case '+':
            fd.flags.forceSign = true;
            break;
        case ' ':
            fd.flags.showNegSign = true;
            break;
        case '0':
            fd.flags.leadingZeros = true;
            break;
        case '#':
            fd.flags.altNumeric = true;
            break;
        }
        pos++;
    }

    if (pos >= formatStr.length) return fd;

    // get the field width
    // The converted argument will be printed in a field at least this wide, and wider if
    // necessary. If the converted argument has fewer characters than the field width, it
    // will be padded on the left (or right, if left adjustment has been requested) to make
    // up the field width. The padding character is normally ' ' (space), but is '0' if the
    // zero padding flag (0) is present.
    //
    // If the field width is specified as *, the value is computed from the next argument,
    // which must be an int.
    if (formatStr[pos] === '*') {
        fd.fieldWidth = '*';
        pos++;
    } else if (formatStr[pos] >= '0' && formatStr[pos] <= '9') {
        fd.fieldWidth = formatStr[pos++];
        while (pos <= formatStr.length && formatStr[pos] >= '0' && formatStr[pos] <= '9')
            fd.fieldWidth += formatStr[pos++];
        fd.fieldWidth = parseInt(fd.fieldWidth, 10);
    }

    if (pos >= formatStr.length) return fd;

    // get the percision
    // A dot '.' separates the field width from the precision.
    // If the precision is specified as *, the value is computed from the next argument, which must be an int.
    if (formatStr[pos] === '.') {
        if (++pos >= formatStr.length) return fd;

        if (formatStr[pos] === '*') {
            fd.precision = '*';
            pos++;
        } else if (formatStr[pos] >= '0' && formatStr[pos] <= '9') {
            fd.precision = formatStr[pos++];
            while (pos <= formatStr.length && formatStr[pos] >= '0' && formatStr[pos] <= '9')
                fd.precision += formatStr[pos++];
            fd.precision = parseInt(fd.precision, 10);
        }
    }

    if (pos >= formatStr.length) return fd;

    // Get the lenth modifier
    // Char Meaning
    // h    The value is to be displayed as a short or unsigned short.
    // l    For d, i, o, u, x or X conversions: the argument is a long, not an int.
    // L    For e, f, g or G conversions: the argument is a long double.
    // NOTE: We handle a length modifier, if present but don't do anything with it
    if (formatStr[pos] === 'h' || formatStr[pos] === 'l' || formatStr[pos] === 'L')
        pos++;

    if (pos >= formatStr.length) return fd;

    // get the conversion character
    // Conversion   Meaning
    // s    The maximum number of characters to be printed from the string.
    // e, E, f  The number of digits to be printed after the decimal point.
    // g, G The number of significant digits.
    // d, i, o, u, x, X The minimum number of digits to be printed. Leading
    //    zeros will be added to make up the field width.
    if (isConversionChar(formatStr[pos]))
        fd.conversion = formatStr[pos++];
    else
        fd.conversion = false;

    fd.endPos = pos;
    return fd;
}

function isConversionChar(str) {
    if (typeof str !== 'string' || str.length < 1) return false;
    switch (str[0]) {
    case '%':
    case 'a':
    case 'A':
    case 'b':
    case 'B':
    case 'c':
    case 'C':
    case 'd':
    case 'D':
    case 'e':
    case 'E':
    case 'f':
    case 'F':
    case 'g':
    case 'G':
    case 'i':
    case 'I':
    case 'j':
    case 'n':
    case 'o':
    case 'O':
    case 'p':
    case 's':
    case 'S':
    case 't':
    case 'u':
    case 'U':
    case 'x':
    case 'X':
        return true;
    }

    return false;
}

// Register the new sprintf function as a global function, as well as a
// method to the String object. If not already defined.
global.sprintf = sprintf;

// Place a printf implementation in the global scope.
global.printf = function() {
    var newArguments = Array.prototype.slice.call(arguments);
    var text = sprintf.apply(undefined, newArguments);
    process.stdout.write(text);
    return text;
};

// a printf method on the String prototype
String.prototype.printf = function() {
    var newArguments = Array.prototype.slice.call(arguments);
    var text = sprintf.apply(undefined, newArguments);
    process.stdout.write(text);
    return text;
};

// a sprintf method on the String prototype
String.prototype.sprintf = function() {
    var newArguments = Array.prototype.slice.call(arguments);
    newArguments.unshift(String(this));
    return sprintf.apply(undefined, newArguments);
};
