// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

// if the first argument after the format string is an array, and there are no more
// arguments, it's assumed that array holds the values for the format string.
var values = [ 99, 'luft', 'ballons' ];
var text = sprintf('I have %d %s%s.\n', values);
text.printf();
