const fs = require('fs');

function readJSON(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function decodeYValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(x, y, k) {
    let result = 0;
    for (let i = 0; i < k; i++) {
        let term = y[i];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= -x[j] / (x[i] - x[j]);
            }
        }
        result += term;
    }
    return result;
}

function main() {
    const inputFile = 'input.json';
    const jsonObject = readJSON(inputFile);
    const keys = jsonObject['keys'];
    const n = keys['n'];
    const k = keys['k'];
    let xValues = [];
    let yValues = [];
    for (let i = 1; i <= k; i++) {
        const base = jsonObject[i.toString()]['base'];
        const value = jsonObject[i.toString()]['value'];
        const yDecoded = decodeYValue(value, base);
        xValues.push(i);
        yValues.push(yDecoded);
    }
    const secret = lagrangeInterpolation(xValues, yValues, k);
    console.log("Secret (constant term c):", secret);
}

main();
