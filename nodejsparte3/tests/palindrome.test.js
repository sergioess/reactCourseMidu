const { palindrome } = require('../utils/for_testing')

test.skip('Palindrome of sergioess', () => {
    const result = palindrome('sergioess');

    expect(result).toBe('sseoigres');
});

test.skip('Palindrome of empty string', () => {
    const result = palindrome('');

    expect(result).toBe('');
});

test.skip('Palindrome of undefined', () => {
    const result = palindrome();

    expect(result).toBeUndefined();
});