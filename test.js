'use strict';
require('./lib/sprintf');
var assert = require('assert');

describe('sprintf()', function() {
    it('Should exist in the global scope.', function() {
        assert.equal(typeof global.sprintf, 'function');
    });
});

describe('String.sprintf()', function() {
    it('Should exist on the string prototype.', function() {
        assert.equal(typeof String.prototype.sprintf, 'function');
    });
});

describe('String.printf()', function() {
    it('Should exist on the string prototype.', function() {
        assert.equal(typeof String.prototype.printf, 'function');
    });
});

describe('sprintf()', function() {
    it('Should return "" when there are no args and format is "%"', function() {
        assert.equal('', sprintf('%'));
    });
});

describe('sprintf()', function() {
    it('Should return "%" when there is an arg and format is "%%".', function() {
        assert.equal('%', sprintf('%%'));
    });
});

describe('sprintf()', function() {
    it('Should return "" when the format is "%n" and the arg is 0', function() {
        assert.equal('', sprintf('%n', 0));
    });
});

describe('sprintf()', function() {
    it('Should return "" when the format is "%p" and the arg is 0', function() {
        assert.equal('', sprintf('%p', 0));
    });
});

describe('sprintf()', function() {
    it('Should return "  4" when the format is "%*d" and the args are: 3, 4', function() {
        assert.equal('  4', sprintf('%*d', 3, 4));
    });
});

describe('sprintf()', function() {
    it('Should return " 01" when the format is "%*.*d" and the args are: 3, 2, 1', function() {
        assert.equal(' 01', sprintf('%*.*d', 3, 2, 1));
    });
});

describe('sprintf()', function() {
    it('Should return "A.30A3D70A3D708" when the format is "%12A" and the arg is: 10.19', function() {
        assert.equal('A.30A3D70A3D708', sprintf('%12A', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "a.30a3d70a3d708" when the format is "%12a" and the arg is: 10.19', function() {
        assert.equal('a.30a3d70a3d708', sprintf('%12a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return " a.30a3d70a3d708" when the format is "%16a" and the arg is: 10.19', function() {
        assert.equal(' a.30a3d70a3d708', sprintf('%16a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "A.30A3D70A3D708" when the format is "%12A" and the arg is: 10.19', function() {
        assert.equal('A.30A3D70A3D708', sprintf('%12A', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "a.30a3d70a3d708" when the format is "%12a" and the arg is: 10.19', function() {
        assert.equal('a.30a3d70a3d708', sprintf('%12a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return " a.30a3d70a3d708" when the format is "%16a" and the arg is: 10.19', function() {
        assert.equal(' a.30a3d70a3d708', sprintf('%16a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "a.30a3d70a3d708 " when the format is "%-16a" and the arg is: 10.19', function() {
        assert.equal('a.30a3d70a3d708 ', sprintf('%-16a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "+a.30a3d70a3d708 " when the format is "%-+17a" and the arg is: 10.19', function() {
        assert.equal('+a.30a3d70a3d708 ', sprintf('%-+17a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return " a.30a3d70a3d708 " when the format is "%- 17a" and the arg is: 10.19', function() {
        assert.equal(' a.30a3d70a3d708 ', sprintf('%- 17a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return " a.30a3d70a3d708 " when the format is "%-#17a" and the arg is: 10.19', function() {
        //assert.equal(' a.30a3d70a3d708 ', sprintf('%-#17a', 10.19));
        assert.equal('a.30a3d7         ', sprintf('%-#17a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "a.31" when the format is "%.2a" and the arg is: 10.19', function() {
        //assert.equal(' a.30a3d70a3d708 ', sprintf('%-#17a', 10.19));
        assert.equal('a.31', sprintf('%.2a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "a.30a4" when the format is "%.4a" and the arg is: 10.19', function() {
        assert.equal('a.30a4', sprintf('%.4a', 10.19));
    });
});

describe('sprintf()', function() {
    it('Should return "0.3333333333333333" when the format is "%12f" and the arg is: 1/3', function() {
        assert.equal('0.3333333333333333', sprintf('%12f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return " 0.3333333333333333" when the format is "%19f" and the arg is: 1/3', function() {
        assert.equal(' 0.3333333333333333', sprintf('%19f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "0.3333333333333333 " when the format is "%-19f" and the arg is: 1/3', function() {
        assert.equal('0.3333333333333333 ', sprintf('%-19f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "+0.3333333333333333 " when the format is "%-+20f" and the arg is: 1/3', function() {
        assert.equal('+0.3333333333333333 ', sprintf('%-+20f', 1/3));
    });
});


describe('sprintf()', function() {
    it('Should return " 0.3333333333333333 " when the format is "%- 20f" and the arg is: 1/3', function() {
        assert.equal(' 0.3333333333333333 ', sprintf('%- 20f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "0.333333            " when the format is "%-#20f" and the arg is: 1/3', function() {
        assert.equal('0.333333            ', sprintf('%-#20f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "0.33" when the format is "%.2f" and the arg is: 1/3', function() {
        assert.equal('0.33', sprintf('%.2f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "0.3333" when the format is "%.4%" and the arg is: 1/3', function() {
        assert.equal('0.33', sprintf('%.2f', 1/3));
    });
});

describe('sprintf()', function() {
    it('Should return "-0001     " when the format is "%-+10.4d" and the arg is: -1.19', function() {
        assert.equal('-0001     ', sprintf('%-+10.4d', -1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "-0001     " when the format is "%- 10.4d" and the arg is: -1.19', function() {
        assert.equal('-0001     ', sprintf('%-+10.4d', -1.19));
    });
});

describe('sprintf()', function() {
    it('Should return " 0001     " when the format is "%- 10.4d" and the arg is: 1.19', function() {
        assert.equal(' 0001     ', sprintf('%- 10.4d', 1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "      0001" when the format is "% 10.4d" and the arg is: 1.19', function() {
        assert.equal('      0001', sprintf('% 10.4d', 1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "     -0001" when the format is "%+10.4d" and the arg is: -1.19', function() {
        assert.equal('     -0001', sprintf('%+10.4d', -1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "     -0001" when the format is "%0+10.4d" and the arg is: -1.19', function() {
        assert.equal('-000000001', sprintf('%0+10.4d', -1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "-000000001" when the format is "%+10.4d" and the arg is: -1.19', function() {
        assert.equal('-000000001', sprintf('%#0+10.4d', -1.19));
    });
});

describe('sprintf()', function() {
    it('Should return "       Thi" when the format is "%-+10.3s" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('       Thi', sprintf('%#0+10.3s', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "This long string" when the format is "%-+10s" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('This long string', sprintf('%#0+10s', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "This long string" when the format is "%-10s" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('This long string', sprintf('%#-10s', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "Thi       " when the format is "%#-+10.3s" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('Thi       ', sprintf('%#-+10.3s', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "T         " when the format is "%#-+10.3s" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('T         ', sprintf('%#-+10.3c', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "         T" when the format is "%#+10.3c" and the arg is: ' +
       '"This long string"', function() {
        assert.equal('         T', sprintf('%#+10.3c', 'This long string'));
    });
});

describe('sprintf()', function() {
    it('Should return "x" when the format is "%c" and the arg is: "x"', function() {
        assert.equal('x', sprintf('%c', 'x'));
    });
});

describe('sprintf()', function() {
    it('Should return "X" when the format is "%C" and the arg is: "x"', function() {
        assert.equal('X', sprintf('%C', 'x'));
    });
});

describe('sprintf()', function() {
    it('Should return "x" when the format is "%c" and the arg is: 120', function() {
        assert.equal('x', sprintf('%c', 120));
    });
});

describe('sprintf()', function() {
    it('Should return "11" when the format is "%b" and the arg is: 3', function() {
        assert.equal('11', sprintf('%b', 3));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%o" and the arg is: 8', function() {
        assert.equal('10', sprintf('%o', 8));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%x" and the arg is: 16', function() {
        assert.equal('10', sprintf('%x', 16));
    });
});

describe('sprintf()', function() {
    it('Should return "A" when the format is "%X" and the arg is: 10', function() {
        assert.equal('A', sprintf('%X', 10));
    });
});

describe('sprintf()', function() {
    it('Should return "a" when the format is "%x" and the arg is: 10', function() {
        assert.equal('a', sprintf('%x', 10));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%d" and the arg is: 10', function() {
        assert.equal('10', sprintf('%d', 10));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%d" and the arg is: "10"', function() {
        assert.equal('10', sprintf('%d', '10'));
    });
});

describe('sprintf()', function() {
    it('Should return "-10" when the format is "%d" and the arg is: "-10"', function() {
        assert.equal('-10', sprintf('%d', '-10'));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%i" and the arg is: 10', function() {
        assert.equal('10', sprintf('%i', 10));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%u" and the arg is: 10', function() {
        assert.equal('10', sprintf('%u', 10));
    });
});

describe('sprintf()', function() {
    it('Should return "10" when the format is "%u" and the arg is: -10', function() {
        assert.equal('10', sprintf('%u', -10));
    });
});

describe('sprintf()', function() {
    it('Should return "10.4" when the format is "%f" and the arg is: 10.4', function() {
        assert.equal('10.4', sprintf('%f', 10.4));
    });
});

describe('sprintf()', function() {
    it('Should return "10.4" when the format is "%F" and the arg is: 10.4', function() {
        assert.equal('10.4', sprintf('%f', 10.4));
    });
});

describe('sprintf()', function() {
    it('Should return "Infinity" when the format is "%f" and the arg is: 2/0', function() {
        assert.equal('Infinity', sprintf('%f', 2/0));
    });
});

describe('sprintf()', function() {
    it('Should return "INFINITY" when the format is "%F" and the arg is: 2/0', function() {
        assert.equal('INFINITY', sprintf('%F', 2/0));
    });
});

describe('sprintf()', function() {
    it('Should return "NAN" when the format is "%D" and the arg is: "a"/2', function() {
        assert.equal('NAN', sprintf('%D', 'a'/2));
    });
});

describe('sprintf()', function() {
    it('Should return "NaN" when the format is "%d" and the arg is: "a"/2', function() {
        assert.equal('NaN', sprintf('%d', 'a'/2));
    });
});

describe('sprintf()', function() {
    it('Should return "6" when the format is "%#d" and the arg is: 6', function() {
        assert.equal('6', sprintf('%#d', 6));
    });
});

describe('sprintf()', function() {
    it('Should return "111" when the format is "%b" and the arg is: 7', function() {
        assert.equal('111', sprintf('%b', 7));
    });
});

describe('sprintf()', function() {
    it('Should return "b111" when the format is "%#b" and the arg is: 7', function() {
        assert.equal('b111', sprintf('%#b', 7));
    });
});

describe('sprintf()', function() {
    it('Should return "B111" when the format is "%#B" and the arg is: 7', function() {
        assert.equal('B111', sprintf('%#B', 7));
    });
});

describe('sprintf()', function() {
    it('Should return "31" when the format is "%o" and the arg is: 25', function() {
        assert.equal('31', sprintf('%o', 25));
    });
});

describe('sprintf()', function() {
    it('Should return "031" when the format is "%#o" and the arg is: 25', function() {
        assert.equal('031', sprintf('%#o', 25));
    });
});

describe('sprintf()', function() {
    it('Should return "031" when the format is "%#O" and the arg is: 25', function() {
        assert.equal('031', sprintf('%#O', 25));
    });
});

describe('sprintf()', function() {
    it('Should return "ab" when the format is "%x" and the arg is: 171', function() {
        assert.equal('ab', sprintf('%x', 171));
    });
});

describe('sprintf()', function() {
    it('Should return "0xab" when the format is "%#x" and the arg is: 171', function() {
        assert.equal('0xab', sprintf('%#x', 171));
    });
});

describe('sprintf()', function() {
    it('Should return "AB" when the format is "%X" and the arg is: 171', function() {
        assert.equal('AB', sprintf('%X', 171));
    });
});

describe('sprintf()', function() {
    it('Should return "0XAB" when the format is "%X" and the arg is: 171', function() {
        assert.equal('0XAB', sprintf('%#X', 171));
    });
});

describe('sprintf()', function() {
    it('Should return "NaN" when the format is "%d" and the arg is: "a"/2', function() {
        assert.equal('NaN', sprintf('%d', 'a'/2));
    });
});

describe('sprintf()', function() {
    it('Should return "%0 and woot" when the format is "%%%d and %s" and the args are: 0, "woot"',
       function() {
        assert.equal('%0 and woot', sprintf('%%%d and %s', 1-1, 'woot'));
    });
});

describe('sprintf()', function() {
    it('Should return "%0 and WOOT" when the format is "%%%d and %S" and the args are: 0, "woot"',
       function() {
        assert.equal('%0 and WOOT', sprintf('%%%d and %S', 1-1, 'woot'));
    });
});

describe('sprintf()', function() {
    it('Should return "%0 and woot" when the format is "%%%d and %S" and the args are: 0, "WOOT"',
       function() {
        assert.equal('%0 and woot', sprintf('%%%d and %t', 1-1, 'WOOT'));
    });
});

describe('sprintf()', function() {
    it('Should return "1, 2 and 3" when the format is "%d, %d and %d" and the args are: '+
    '2-1, 4/2, 1.5*2',
       function() {
        assert.equal('1, 2 and 3', sprintf('%d, %d and %d', 2-1, 4/2, 1.5*2));
    });
});

describe('sprintf()', function() {
    it('Should return "%0, hello" when the format is "%%%d, %s%n" and the args are: '+
      '0,"hello",r', function() {
        var r = {};
        assert.equal('%0, hello', sprintf('%%%d, %s%n', 0, 'hello', r));
        assert.equal(r.sprintf_n, 9);
    });
});

describe('sprintf()', function() {
    it('Should return "Hello %%s, a formatted number is: 3.14" when the format is '+
       '"Hello %%s, a formatted number is: %3.2f" and the arg is: 22/7', function() {
        assert.equal('Hello %s, a formatted number is: 3.14',
                     sprintf('Hello %%s, a formatted number is: %3.2f', 22/7));
    });
});

describe('sprintf()', function() {
    it('Should return "Hello Edmpond, a formatted number is: 3.14" when the format is '+
       '"Hello %s, a formatted number is: %3.2f" and the args are: "Edmond", 22/7', function() {
        assert.equal('Hello Edmond, a formatted number is: 3.14',
                     sprintf('Hello %s, a formatted number is: %3.2f', 'Edmond', 22/7));
    });
});

describe('sprintf()', function() {
    it('Should return "Hello Edmpond, a formatted number is: 3.14" when the format is '+
       '"Hello %s, a %s number is: %3.2f" and the arg is: [ "Edmond", "formatted", 22/7 ]', function() {
        assert.equal('Hello Edmond, a formatted number is: 3.14',
                     sprintf('Hello %s, a %s number is: %3.2f', [ 'Edmond', 'formatted', 22/7 ]));
    });
});


describe('sprintf()', function() {
    it('Should return "Hello Edmpond, a formatted number is: 3.14 and here is an object: '+
       '{"a":111,"b":"A string","c":67}" when the format is '+
       '"Hello %s, a %s number is: %3.2f nd here is an object: %j" and the args are: '+
       '"Edmond", "boring", 3.14159265359, obj', function() {
        var obj = {
            a: 111,
            b: 'A string',
            c: 67
        };
        assert.equal('Hello Edmond, a boring number is: 3.14 and here is an object: '+
            '{"a":111,"b":"A string","c":67}',
           sprintf('Hello %s, a %s number is: %3.2f and here is an object: %j',
           'Edmond', 'boring', 3.14159265359, obj));
    });
});


describe('sprintf()', function() {
    it('Should return "I have 99 luftballons." when the format is "I have %d %s%s." '+
        'and the arg is: [ 99, "luft", "ballons" ]', function() {
        assert.equal('I have 99 luftballons.', sprintf('I have %d %s%s.', [ 99, 'luft', 'ballons' ]));
    });
});

describe('sprintf()', function() {
    it('Should return "I like ducks, a lot" when the format string is "I like %s, a lot" '+
        'and the arg is: "ducks".', function() {
        assert.equal('I like ducks, a lot', sprintf('I like %s, a lot', 'ducks'));
    });
});

describe('sprintf()', function() {
    it('Should return "There are 22 geese." when the format string is "There are %d geese." '+
        'and the arg is: 22', function() {
        assert.equal('There are 22 geese.', sprintf('There are %d geese.', 22));
    });
});

describe('sprintf()', function() {
    it('Should return "This is a string with two descriptors: 1) 22 2)" when the format '+
        'string is "This is a string with two descriptors: 1) %d 2) %s" '+
        'and the arg is: 22', function() {
        assert.equal('This is a string with two descriptors: 1) 22 2) ',
        sprintf('This is a string with two descriptors: 1) %d 2) %s', 22));
    });
});

describe('sprintf()', function() {
    it('Should return "This is a string with two descriptors: 1) 22 2)" when the format '+
        'string is "This is a string with two descriptors: 1) %d 2) %s" '+
        'and the args is: 22, "Edmond", {a:"hmmm"})', function() {
        assert.equal('This is a string with two descriptors: 1) 22 2) Edmond',
        sprintf('This is a string with two descriptors: 1) %d 2) %s', 22, 'Edmond', {a: 'hmmm'}));
    });
});
