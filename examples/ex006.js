// What happens what you have more format descriptors than values?

// In your code, you would do the following:
// require('sprintf');
require('../lib/sprintf');

// Format descriptors that lacks values, just fall through. Below, we
// get a %s.
var text = sprintf('This is a string with two descriptors: 1) %d 2) %s', 22);
console.log(text);

// But we can still use the %s, if we provide a value
text = text.sprintf('brown cows');
console.log(text);
