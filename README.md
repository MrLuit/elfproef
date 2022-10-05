# Elfproef (11-proof)

[![Travis CI](https://img.shields.io/travis/com/MrLuit/elfproef.svg?style=flat-square)](https://travis-ci.com/MrLuit/elfproef)
[![Version](https://img.shields.io/npm/v/elfproef.svg?style=flat-square)](https://www.npmjs.com/package/elfproef)
[![Dependencies](https://img.shields.io/david/MrLuit/elfproef.svg?style=flat-square)](https://david-dm.org/MrLuit/elfproef)
[![License](https://img.shields.io/github/license/MrLuit/elfproef.svg?style=flat-square)](https://github.com/MrLuit/elfproef/blob/master/LICENSE)

------

_Implementation of the 11-proof, a mathematical test used by the Dutch government for various digital identification numbers_

------

## Description

### Explanation
Elfproef is Dutch for **11-proof** (`elf` means `11`, `proef` means `test`). It was originally designed to prevent people from trying to transfer money to a mistyped account number, specifically where either **one digit is incorrect**, or **2 digits were swapped**.

The principle is very simple. First of all, a given number is split into its individual digits. Secondly, those digits are multiplied by their **"weight"**, a multiplier which is based on the position of the digit. Finally, the sum of all multiplied numbers is calculated. 

If the result is **divisible by 11** and **greater than 0**, the 11-proof is _valid_.

### Example
A Dutch social security number (**BSN**) consists of 9 digits and must suffice the 11-proof with weights `[9, 8, 7, 6, 5, 4, 3, 2, -1]`. Sometimes the BSN can also consist of 8 digits, which is usually converted to 9 digits by adding a leading zero.

For a given BSN `ABCDEFGHI`, the outcome of the following formula must be divisble by 11 and have no more than one leading zero.

```json
(9 × A) + (8 × B) + (7 × C) + (6 × D) + (5 × E) + (4 × F) + (3 × G) + (2 × H) + (-1 × I)
```

A valid BSN would be `111222333`. 
```json
(9 × 1) + (8 × 1) + (7 × 1) + (6 × 2) + (5 × 2) + (4 × 2) + (3 × 3) + (2 × 3) + (-1 × 3) = 66
```

The result is divisible by 11: 

`66 > 0 66 ∧ 66 mod 11 = 0`

## Usage

### Installation
`yarn add elfproef -E`

### Example
```javascript
import { validateBSN } from 'elfproef';

const BSN = "111222333";
const validBSN = validateBSN(BSN);

console.log(validBSN);
```

### Functions
```javascript
elfProef(input: string | number, weights: number[], positiveSum: boolean): boolean
```
The first argument is the input string or number which will be tested. The second argument is an array containing the weights which will be used to multiply each digit, which means the length of this array should be equal to the input length. The third argument adds an additional check for making sure the resulting sum is greater than zero, which is not used for the BSN, but was needed for checking dutch banking numbers before the IBAN system was implemented. This functions returns a boolean indicating whether the check was successful.
```javascript
validateBSN(input: string | number): boolean
```
This function will validate a BSN as shown in the example above. The input can be either a string or a number, and the return value will be a boolean indicating whether the provided input is a valid BSN.
```javascript
generateBSN(): string
```
This function generates a random valid BSN and returns it as a string.


## References
- https://nl.wikipedia.org/wiki/Elfproef
- https://nl.wikipedia.org/wiki/Burgerservicenummer
- https://www.rijksoverheid.nl/onderwerpen/privacy-en-persoonsgegevens/vraag-en-antwoord/wat-is-het-burgerservicenummer-bsn

## License

This project is licensed under the [MIT License](https://github.com/MrLuit/elfproef/blob/master/LICENSE). 