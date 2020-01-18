import { validateBSN } from '../src/index';
import { expect } from 'chai';

describe('BSN', () => {
    it('string 111222333 should be valid', () => {
        const result = validateBSN('111222333');
        expect(result).to.be.true;
    });
    it('string 123456782 should be valid', () => {
        const result = validateBSN('123456782');
        expect(result).to.be.true;
    });
    it('string 000000000 should be invalid', () => {
        const result = validateBSN('000000000');
        expect(result).to.be.false;
    });
    it('string 999999999 should be invalid', () => {
        const result = validateBSN('999999999');
        expect(result).to.be.false;
    });
    it('number 111222333 should be valid', () => {
        const result = validateBSN(111222333);
        expect(result).to.be.true;
    });
    it('number 999999999 should be invalid', () => {
        const result = validateBSN(999999999);
        expect(result).to.be.false;
    });
});
