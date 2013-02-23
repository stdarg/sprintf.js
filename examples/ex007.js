// Do the casing format descriptors work?
// Sure!

// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

// Format descriptors that lacks values, just fall through. Below, we
// get a %s.
var caseExStr = 'The quick brown fox jumped over the lazy dog.\n';

// display normal mixed case
'%s'.printf(caseExStr);

// display all upper case
'%S'.printf(caseExStr);

// display all lower case
'%t'.printf(caseExStr);
