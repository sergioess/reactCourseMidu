const { average } = require('../utils/for_testing')





describe.skip('average', () => {
    test('of one value is the value itself', () => {

        expect(average([1])).toBe(1);
    });
    test('of many is calculated correctly', () => {
        const result = average([1, 2, 3, 4, 5, 6]);

        expect(result).toBe(3.5);
    });
    test('if empty array is zero', () => {
        const result = average([]);

        expect(result).toBe(0);
    });
})