export const elfProef = (
    input: string | number,
    weights: number[],
    positiveSum: boolean
): boolean => {
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
    const validMod = sum % 11 === 0;
    const validRange = positiveSum === false || sum > 0;
    return validMod && validRange;
};

export const validateBSN = (input: string | number): boolean => {
    if (typeof input === 'number') {
        input = input.toString();
    }
    const validFormat = /^[\d]{8,9}$/.test(input);
    if (!validFormat) {
        return false;
    }
    const prependedInput = input.length === 8 ? `0${input}` : input;
    if (prependedInput.startsWith('00')) {
        return false;
    }
    const validElfProef = elfProef(prependedInput, [9, 8, 7, 6, 5, 4, 3, 2, -1], false);
    return validElfProef;
};

export const generateBSN = (): string => {
    while (true) {
        const randomNumber = Math.floor(Math.random() * (999999999 - 0 + 1) + 0);
        const prependedNumber = String(randomNumber).padStart(9, '0');
        if (validateBSN(prependedNumber)) {
            return prependedNumber;
        }
    }
};
