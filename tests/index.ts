import { validateBSN, generateBSN } from '../src/index';
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
    it('string 100000009 should be valid', () => {
        const result = validateBSN('100000009');
        expect(result).to.be.true;
    });
    it('string 010000008 should be valid', () => {
        const result = validateBSN('010000008');
        expect(result).to.be.true;
    });
    it('8-digit string 10000008 should be valid', () => {
        const result = validateBSN('10000008');
        expect(result).to.be.true;
    });
    it('number 111222333 should be valid', () => {
        const result = validateBSN(111222333);
        expect(result).to.be.true;
    });
    it('number 999999999 should be invalid', () => {
        const result = validateBSN(999999999);
        expect(result).to.be.false;
    });
    it('randomly generated BSNs should be valid', () => {
        for (let i = 0; i < 1000; i++) {
            const randomBSN = generateBSN();
            expect(validateBSN(randomBSN)).to.be.true;
        }
    });

    it('total amount of valid BSNs is correct', () => {
        let valid = 0;
        for (let bsn = 0; bsn < 999999999; bsn++) {
            const bsnString = String(bsn).padStart(9, '0');
            if (validateBSN(bsnString)) {
                valid++;
            }
        }
        expect(valid).to.equal(90000000);
    }).timeout(0);
});
