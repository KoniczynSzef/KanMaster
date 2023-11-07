import { expect, test } from 'vitest';

export const fizzbuzz = (n: number) => {
    if (n % 5 === 0 && n % 3 === 0) {
        return 'fizzbuzz';
    } else if (n % 3 === 0) {
        return 'fizz';
    } else if (n % 5 === 0) {
        return 'buzz';
    }

    return n;
};

test("fizzbuzz(10) === 'buzz'", () => {
    expect(fizzbuzz(10)).toBe('buzz');
});
