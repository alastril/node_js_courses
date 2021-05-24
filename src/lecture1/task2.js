const csvFilePath = './csv/nodejs-hw1-ex1.csv'
const txtFile = './csv/nodejs-hw1-ex2.txt'
const csv = require('csvtojson')
const fs = require('fs')

try {
    fs.accessSync(txtFile, fs.F_OK)
    fs.writeFileSync(txtFile, '')
} catch {
    console.log('not exist - ' + txtFile)
}

csv()
    .fromStream(fs.createReadStream(csvFilePath))
    .subscribe((json) => new Promise((resolve) => {
            fs.appendFile(txtFile, JSON.stringify(json) + '\r\n', (error) => {
                if (error) {
                    console.log(error.message)
                }
                resolve()
            })
        })
        , (json) => {
            return new Promise((resolve, reject) => {
                console.log(" error when parsing row: " + json);
                reject()
            })
        }, () => new Promise(() => {
            console.log("Finish copy from csv to txt files");
        })
    );

//     (json) => {
//     fs.appendFile(txtFile, concat(JSON.stringify(json), '\r\n'), (error) => {
//         if (error) {
//             console.log(error.message)
//         }
//     })
// })
// .then((jsonObj) => {
//     let result = '';
//     jsonObj.forEach(obj => {
//         result = result.concat(JSON.stringify(obj), '\r\n')
//     });
//     );

// })