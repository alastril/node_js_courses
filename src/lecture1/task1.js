
console.log('Hello)')
process.stdin.resume();
process.stdin.setEncoding('utf-8');
console.log('Enter the data...');

function reverse(string) {
    return string.toString().split('').reverse().join('');
}

process.stdin.on('data', function(data) { process.stdout.write(reverse(data)); console.log(''); })