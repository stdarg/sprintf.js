A node.js sprintf implementation
================================

Note
====

This implementation of sprintf.js is no longer from
https://github.com/jakobwesthoff/sprintf.js A new parser has been written
enabling the format descriptors to be a bit more "C"-like.

Please note sprintf.js adds the functions ``printf`` and ``sprintf`` to the
global scope and onto the string prototype.

Installation
============

    $ npm install sprintf.js

Capabilities
============

This library provides an almost complete implementation of the ``sprintf`` and
``printf`` functions from the standard C library. All options from the C format
strings are valid, however where there is no corresponding functionality in
JavaScript, nothing happens - it's not an error, there is no functionality in
cases where it would make no sense.

The format string has the form:

    % [flags] [field_width] [.precision] [length_modifier] conversion_character

Components in brackets \[\] are optional. The minimum is a % and a conversion
character (e.g. %d).

### Flags
Flags can be in any order.

<table>
<tr><td><b>Flag</b></td> <td><b>Meaning</b></td></tr>
<tr><td>-</td>       <td>The output is left justified in its field, not right justified (the default).</td></tr>
<tr><td>+</td>       <td>Signed numbers will always be printed with a leading sign (+ or -).</td></tr>
<tr><td>space</td>   <td>Positive numbers are preceded by a space (negative numbers by a - sign).</td></tr>
<tr><td>0</td>       <td>For numeric conversions, pad with leading zeros to the field width.</td></tr>
<tr><td>#</td>       <td>An alternative output form. For o, the first digit will be '0'. For x or X, "0x" or "0X". For b or B, "b" or "B" will be prefixed to a non-zero result. For e, E, f, F, g and G, the output will always have a decimal point; for g and G, trailing zeros will not be removed.</td></tr>
</table>

### Field width
The converted argument will be printed in a field at least this wide, and wider if necessary. If the converted argument has fewer characters than the field width, it will be padded on the left (or right, if left adjustment has been requested) to make up the field width. The padding character is normally ' '(space), but is '0' if the zero padding flag (0) is present.
If the field width is specified as *, the value is computed from the next argument, which must be an int.

### Precision
A dot '.' separates the field width from the precision.
If the precision is specified as '*', the value is computed from the next argument, which must be a number. If the number is negative, the sign is dropped and if the number has a fractional component, that is also discarded.

<table>
<tr>  <td><b>Conversion</b></td><td><b>Meanings</b></td>
<tr>  <td>s</td>                <td>The maximum number of characters to be printed from the string.</td></tr>
<tr>  <td>e, E, f</td>          <td>The number of digits to be printed after the decimal point.</td></tr>
<tr>  <td>g, G</td>             <td>The number of significant digits.</td></tr>
<tr>  <td>d, i, o, u, x, X</td> <td>The minimum number of digits to be printed. Leading zeros will be added to make up the field width.</td></tr>
</table>

### Length modifier

Length has no meaning in JavaScript - all numbers have the same length - 64 bits. It is possible to emulate what C does, but I can't think a good reason to do so. Right now, the length modifier is parsed, but does nothing. Suggestions are welcome, though.

<table>
<tr><td><b>Character<b></td><td><b>Meaning</b></td></tr>
<tr><td>h</td>             <td>The value is to be displayed as a short or unsigned short.</td></tr>
<tr><td>l</td>             <td>For d, i, o, u, x or X conversions: the argument is a long, not an int.</td></tr>
<tr><td>L</td>             <td>For e, f, g or G conversions: the argument is a long double.</td></tr>
</table>

### Conversion character
<table>
<tr><td><b>Character</b></td><td><b>Meaning</b></td></tr>
<tr><td>d, i</td>          <td>Display an int in signed decimal notation.</td></tr>
<tr><td>o</td>             <td>Display an int in unsigned octal notation (without a leading 0).</td></tr>
<tr><td>b, B</td>          <td>Display an int in unsigned binary notation (without a leading b or B).</td></tr>
<tr><td>u</td>             <td>Display an int in unsigned decimal notation.</td></tr>
<tr><td>x, X</td>          <td>Display an int in unsigned hexadecimal notation (without a leading 0x or 0X). x gives lower case output, X upper case. cDisplay a single char (after conversion to unsigned int).</td></tr>
<tr><td>e, E</td>          <td>Display a double or float (after conversion to double) in scientific notation. e gives lower case output, E upper case.</td></tr>
<tr><td>f</td>             <td>Display a double or float (after conversion to double) in decimal notation.</td></tr>
<tr><td>g, G</td>          <td>g is either e or f, chosen automatically depending on the size of the value and the precision specified. G is similar, but is either E or f.</td></tr>
<tr><td>j</td>             <td>Display a JSON object using JSON.stringify.</td></tr>
<tr><td>n</td>             <td>Nothing is displayed. The corresponding argument must be an object. The number of characters written so far is assigned to a property name ``sprintf_n``.</td></tr>
<tr><td>s, S, t</td>       <td>Display a string. The argument is a pointer to char. Characters are displayed until a '\0' is encountered, or until the number of characters indicated by the precision have been displayed. S forces all uppercase, t forces all lowercase while s does no case modification.</td></tr>
<tr><td>p</td>             <td>Does nothing, returns an empty string.</td></tr>
<tr><td>%</td>             <td>Display the % character.</td></tr>
</table>


Usage
=====

To use, simply require the module and then use the global function ``sprintf`` and
the string prototype method ``printf``:

    require('sprintf');

    var text = sprintf('Hello %%s, a formatted number is: %3.2f\n', 22/7);
    process.stdout.write(text);
    printf(text, 'Jakob');   // The format string is the text in the string object.

    // we can also do Javascript objects
    var obj = { a: 1, b: 'A string', c: 444.1 };

    var text = sprintf('This is an object: %j\n', obj);
    printf(text);

    // if the first argument after the format string is an array, and there are no more
    // arguments, it's assumed that array holds the values for the format string.
    var values = [ 99, 'luft', 'ballons' ];
    var text = sprintf('I have %d %s%s.', values);


After loading the sprintf.js Javascript file, the global functions ``printf``
and ``sprintf`` are registered and ready for use. Further, the String object is
extended with ``printf`` mnd ``sprintf`` methods.

You may either use the global function ``sprintf`` which returns the newly
formatted string if supplied with the format string, as well as all needed
arguments:

    var formatted = sprintf('The number is %.2f', number);

You may use the string prototype's ``sprintf`` method directly on the format
string::

    var formatted = 'The number is %.2f'.sprintf(number);

You can use the string prototype's ``printf`` to display the formatted output to
standard out:

    'I like %s, a lot'.printf('ducks');
    var text = 'There are %d geese';
    text.printf(22);

Internally the exact the same processing takes place. You may decide which
syntax you like better.

License
=======

This code is under the [`MIT License`](http://www.opensource.org/licenses/mit-license.html "Link to the MIT License").
Copyright (c) 2013,2014 Edmond Meinfelder

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
