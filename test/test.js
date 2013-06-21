'use strict';
require('../lib/sprintf');
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
    it('Should return "     -0001" when the format is "%+10.4d" and the arg is: -1.19', function() {
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
