0.1.1-3 / 2013-06-20
==================
* Documentation fixes.

0.1.0 / 2013-06-20
==================
* Removed reg-ex based parser. Replaced with real parser.
* Added full set of C-like printf format descriptors. Some, like %p do nothing.

0.0.8 / 2013-06-11
==================
* Fixed bug where tokens were not properly consumed with '%%'

0.0.7 / 2013-06-10
==================
* Fixed bug with sprintf('%4d', -44) returning '- 44', when it should be ' -44'

0.0.6 / 2013-06-10
==================
* Added mocha tests

0.0.5 / 2013-03-03
==================
 * Fixed a bug where undefined values would cause an exception

0.0.4 / 2013-02-22
==================
  * Added support for %S (uppercase) and %t (lower case)
  * Added illustrative examples for casing.
  * Remove all 'throw' statements.


0.0.3 / 2013-02-22
==================
  * Added %j format descriptor to display Javascript object
  * Also created new repo, so I could have issues/bugs.
  * Added sprintf onto the string prototype


0.0.2 / 2013-02-16
==================
 * Add feature: if first value after format string is an array and there are no more arguments,
    use the values in the array as the values for the format string.


0.0.1 / 2013-02-16
==================
 * Added use strict.
 * Cleaned code up per jshint

