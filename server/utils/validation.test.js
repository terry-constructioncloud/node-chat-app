const expect = require('expect');
const {isRealString} = require('./validation');

describe('Test isRealString', () => {

    it('should not allow empty string', () => {
        expect(isRealString('')).toBe(false);
    });

    it('should not allow no-string value', () => {
        expect(isRealString(1)).toBe(false);
        expect(isRealString(false)).toBe(false);
        expect(isRealString([])).toBe(false);
        expect(isRealString(null)).toBe(false);
        expect(isRealString(undefined)).toBe(false);
        expect(isRealString({})).toBe(false);
    });

    it('should not allow string with only spaces', () => {
        expect(isRealString('  ')).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        expect(isRealString(' a ')).toBe(true);
    });
});