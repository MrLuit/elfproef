export const elfProef = (input: string | number, weights: number[]): boolean => {
    if (typeof input === 'number') {
        input = input.toString();
    }
    if (input.length !== weights.length) {
        throw new Error('Amount of weights must be equal to length of input');
    }
    const numbers = input.split('');
    const sum = numbers
        .map((value: string, index: number) => {
            const number = parseInt(value, 10);
            const weight = weights[index];
            return number * weight;
        })
        .reduce((a, b) => a + b);
    return sum > 0 && sum % 11 === 0;
};

export const validateBSN = (input: string | number): boolean => {
    if (typeof input === 'number') {
        input = input.toString();
    }
    const validFormat = /^[\d]{9}$/.test(input);
    if (validFormat) {
        const validElfProef = elfProef(input, [9, 8, 7, 6, 5, 4, 3, 2, -1]);
        return validElfProef;
    } else {
        return false;
    }
};
