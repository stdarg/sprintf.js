
// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

var text = sprintf('Hello %s, a %s number is: %3.2f\n', ['Jakob', 'formatted', 22/7]);
process.stdout.write(text);
var text = sprintf('Hello %s, a %s number is: %3.2f\n', 'Edmond', 'floormatted', 3.14159265359);
process.stdout.write(text);
