
// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

var text = sprintf('Hello %%s, a formatted number is: %3.2f\n', 22/7);
process.stdout.write(text);
text.printf('Jakob');
