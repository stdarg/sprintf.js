
// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

var obj = {
    a: 111,
    b: 'A string',
    c: 67
};

var text = sprintf('Hello %s, a %s number is: %3.2f and here is an object: %j\n', 'Edmond', 'boring', 3.14159265359, obj);
process.stdout.write(text);
