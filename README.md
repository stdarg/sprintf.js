A node.js sprintf implementation
================================

Note
====

This implementation of sprintf.js is from https://github.com/jakobwesthoff/sprintf.js
and exists here in a "nodified" state with slight modifications.

Please note this implementation of sprintf adds a function ``sprintf`` to the global
scope and places a ``printf`` and a ``sprintf`` onto the string prototype.

Installation
============

    $ npm install sprintf.js

Capabilities
============

This library does provide an almost complete reimplementation of the sprintf
function known from the standard c library.

The following datatypes are supported:

* %%: A literal percent sign
* %b: A binary number
* %c: An ASCII character represented by the given value
* %d: A signed decimal number
* %f: A floating point value
* %j: A Javascript object (representated as JSON)
* %o: An octal number
* %s: A string
* %S: A string (all upper case)
* %t: A string (all lower case)
* %x: A hexadecimal number (lowercase characters)
* %X: A hexadecimal number (uppercase characters)


All of the usual formatting flags are supported as well. Therefore you may
specify the algebraic sign, padding, alignment, width and precision. The syntax
is equivalent to the one used by the sprintf c function.


Usage
=====

To use, simply require the module and then use the global function ``sprintf`` and
the string prototype method ``printf``::

    require('sprintf');

    var text = sprintf('Hello %%s, a formatted number is: %3.2f\n', 22/7);
    process.stdout.write(text);
    text.printf('Jakob');   // The format string is the text in the string object.

    // we can also do Javascript objects
    var obj = { a: 1, b: 'A string', c: 444.1 };

    var text = sprintf('This is an object: %s\n', obj);
    text.printf();

    // if the first argument after the format string is an array, and there are no more
    // arguments, it's assumed that array holds the values for the format string.
    var values = [ 99, 'luft', 'ballons' ];
    var text = sprintf('I have %d %s%s.', values);


After the corresponding Javascript file has been loaded, the global function
``sprintf`` is registered, ready to be called. Furthermore the String object is
extended with a ``printf`` method. Both of these are different means to execute
the same functionality.

You may either use the global function ``sprintf`` which returns the newly
formatted string if supplied with the format string, as well as all needed
arguments::

    var formatted = sprintf('The number is %.2f', number);

You may use the string prototype's ``sprintf`` method directly on the format string::

    var formatted = 'The number is %.2f'.sprintf(number);

Finally, you can use the string prototype's ``printf`` to display the formatted
output to standard out::

    'I like %s, a lot'.printf('ducks');
    var text = 'There are %d geese';
    text.printf(22);

Internally the exactly the same processing takes place. Therefore you may
decide freely which syntax you like better.


License
=======

This library is licensed under the `MIT License`__
http://www.opensource.org/licenses/mit-license.html
