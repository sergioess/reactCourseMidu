const palindrome = (string) => {
    if (typeof string === 'undefined')
        return undefined;
    return string.split('').reverse().join('');
}

const average = array => {
    if (array.length === 0) {
        return 0;
    }
    let sum = 0;
    array.forEach(num => {
        sum += num;
        console.log(sum);
    });
    return sum / array.length
}

// console.log(average([1, 2, 3, 4, 5, 6]));

module.exports = {
    palindrome, average
}