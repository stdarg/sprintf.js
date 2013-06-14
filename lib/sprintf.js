'use strict';

var sprintf = function(format) {
    // Check for format definition
    if (typeof format !== 'string')
        return 'sprintf: The first argument needs to be a string.';

    var args = [''];
    var i;

    // If the second arg is an array and there are no more arguments
    // use the array as a list of arguments. Also,
    // re-assign arguments to args[] from arguments[1]
    if (arguments.length === 2 && '[object Array]' === toString.call(arguments[1])) {
        // arguments is an array-like object, not an array
        for (i=0; i<arguments[1].length; ++i) {
            args[i+1] = arguments[1][i];
        }
    } else {
        // arguments is an array-like object, not an array
        for (i=0; i<arguments.length; ++i) {
            args[i] = arguments[i];
        }
    }

    // does this string even have a format descriptor starting with '%'?
    var fdIdx = format.indexOf('%');
    if (fdIdx === -1)
        return format;

    var lastIdx = -1;

    // process each format descriptor
    do {

        var fd = parseFormatDescriptor(format, fdIdx);


        parts[pIdx] = {
            begin: part.index,                  // beginning of the part in the string
            end: part.index + part[0].length,   // end of the part in the string
            sign: (part[1] === '+'),            // force sign
                                                // is the given data negative
            negative: (parseInt(args[paramIndex], 10) < 0) ? true : false,
            padding: (part[2] === undefined) ?  // padding character (default: <space>)
                     (' ') :                    // default
                     ((part[2].substring(0, 1) === '\'') ?
                         (part[3]) :            // use special char
                         (part[2])),            // use normal <space> or zero
            alignLeft: (part[4] === '-'),       // should the output be aligned left?
                                                // width specifier (number or false)
            width: (part[5] !== undefined) ? part[5] : false,
            decimalPercision: (typeof part[6] === 'string' && part[6][0] === '.') ?  true : false,
                                                // precision specifier (number or false)
            precision: (part[7] !== undefined) ? part[7] : false,
            type: part[8],                      // type specifier
        };

        var data;
        switch(part[8]) {
            case '%':
                data = '%';
                // DO NOT CONSUME AN ARG
                break;
            case 'j':
                data = JSON.stringify(args[paramIndex]);
                paramIndex++;   // consume
                break;
            default:
                data = String (args[paramIndex]);
                paramIndex++;   // consume
                break;
        }
        parts[pIdx].data = data;
        lastIdx = fdidx;

    } while ((fdIdx = format.indexOf('%')) !== -1);

    var newString = '';
    var start = 0;
    // Generate our new formated string
    for(var i=0; i<parts.length; ++i) {
                                            // Add first unformated string part
        newString += format.substring(start, parts[i].begin);
        start = parts[i].end;               // Mark the new string start

        if (typeof parts[i].data === 'undefined')
            parts[i].data = 'undefined';

        // Create the appropriate preformat substitution
        // This substitution is only the correct type conversion. All the
        // different options and flags haven't been applied to it at this
        // point
        var preSubstitution = '';
        switch (parts[i].type) {
            case '%':
                preSubstitution = '%';
                break;
            case 'b':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution += parseInt(parts[i].data, 10).toString(2);
                break;
            case 'c':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution = String.fromCharCode(parseInt(parts[i].data, 10));
                break;
            case 'd':
                // preSubstitution = String(Math.abs(parseInt(parts[i].data, 10)));
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution += String(parseInt(parts[i].data, 10));
                break;
            case 'f':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution = (parts[i].precision === false) ?
                                  (String((parseFloat(parts[i].data)))) :
                                  (parseFloat(parts[i].data).toFixed(parts[i].precision));
                break;
            case 'o':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution += Math.abs(parseInt(parts[i].data, 10)).toString(8);
                break;
            case 'j':
                // Cut if precision is defined
                preSubstitution = parts[i].data.substring(0, parts[i].precision ?
                                parts[i].precision : parts[i].data.length);
                break;
            case 's':
                // Cut if precision is defined
                preSubstitution = parts[i].data.substring(0, parts[i].precision ?
                                    parts[i].precision : parts[i].data.length);
                break;
            case 'S':
                // Cut if precision is defined
                preSubstitution = parts[i].data.substring(0, parts[i].precision ?
                                    parts[i].precision : parts[i].data.length).toUpperCase();
                break;
            case 't':
                // Cut if precision is defined
                preSubstitution = parts[i].data.substring(0, parts[i].precision ?
                                    parts[i].precision : parts[i].data.length).toLowerCase();
                break;
            case 'x':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution += parseInt(parts[i].data, 10).toString(16).toLowerCase();
                break;
            case 'X':
                if (!parts[i].negative && parts[i].sign)
                    preSubstitution += '+';
                preSubstitution += parseInt(parts[i].data, 10).toString(16).toUpperCase();
                break;
            default:
                preSubstitution = '?%'+parts[i].type+'?';
                break;
        }

        // The % character is a special type and does not need further processing
        if (parts[i].type ===  '%') {
            newString += preSubstitution;
            continue;
        }

        // Modify the preSubstitution by taking sign, padding and width
        // into account

        // Pad the string based on the given width
        if (parts[i].width !== false) {
            // Padding needed?
            if (parts[i].width > preSubstitution.length)
            {
                var origLength = preSubstitution.length;
                for(var j = 0; j < parts[i].width - origLength; ++j)
                {
                    preSubstitution = (parts[i].alignLeft === true) ?
                                      (preSubstitution + parts[i].padding) :
                                      (parts[i].padding + preSubstitution);
                }
            }
        }

        // Add the substitution to the new string
        newString += preSubstitution;
    }

    // Add the last part of the given format string, which may still be there
    newString += format.substring(start, format.length);
    return newString;
};

var util = require('util');


var fd = parseFormatDescriptor('%-99.22hd quick brown fox %d', 0);
//var fd = parseFormatDescriptor('The quick brown fox %d', 4);
console.log('The quick brown fox %d :'+util.inspect(fd, {colors: true, depth: null}));

function parseFormatDescriptor(formatStr, pos) {

    var fd = {};    // return object

    if (typeof formatStr !== 'string' || pos >= formatStr.length)
        return fd;

    // check argument sanity
    if (typeof pos !== 'number' || typeof formatStr !== 'string' || formatStr.length <= pos)
        return fd;

    // find the next location of a '%' start at pos
    pos = formatStr.indexOf('%', pos);
    if (pos === -1)
        return fd;

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
    fd.flags['leftJustified'] = false;
    fd.flags['forceSign'] = false;
    fd.flags['showNegSign'] = false;
    fd.flags['leadingZeros'] = false;
    fd.flags['altNumeric'] = false;

    while (pos < formatStr.length && (formatStr[pos] === '-' || formatStr[pos] === '+' || formatStr[pos] === ' ' || formatStr[pos] === '0' || formatStr[pos] === '#')) {
        switch (formatStr[pos]) {
            case '-':
                fd.flags['leftJustified'] = true;
                break;
            case '+':
                fd.flags['forceSign'] = true;
                break;
            case ' ':
                fd.flags['showNegSign'] = true;
                break;
            case '0':
                fd.flags['leadingZeros'] = true;
                break;
            case '#':
                fd.flags['altNumeric'] = true;
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
        } else if (formatStr[pos] >= '0' && formatStr[pos] <= '9') {
            fd.precision = '';
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
    // d, i, o, u, x, X The minimum number of digits to be printed. Leading zeros will be added to make up the field width.
    switch (formatStr[pos]) {
        case 's': case 'e': case 'E': case 'f': case 'g': case 'G':
        case 'd': case 'i': case 'o': case 'u': case 'x': case 'X':
        case '%':
            fd.conversion = formatStr[pos++];
            fd.endPos = pos;
            break;
    }

    return fd;
}

// Register the new sprintf function as a global function, as well as a
// method to the String object. If not already defined.
global.sprintf = sprintf;

// a printf method on the String prototype
String.prototype.printf = function() {
    var newArguments = Array.prototype.slice.call(arguments);
    newArguments.unshift(String(this));
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
