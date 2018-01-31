const expect = require('expect');

var { isRealString } = require('./validation');

describe('Validate input login', () => {

    it('should reject non-string values', () => {
        var res = isRealString(665);
        expect(res).toBe(false);
    });

    it('should reject empty trimmed strings', () => {
        var res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var res = isRealString('  ciao  ');
        expect(res).toBe(true);
    });
});
