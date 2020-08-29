const fs = require('fs');

const reviews = [1, 10, 20, 20, 20, 500];

const seedData = entries => {
  let dataString = '';
  for (let i = 1; i < entries; i++) {
    dataString += `${i}\n`;
    dataString += `${reviews[i%6]}`;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile('data2.txt', dataString, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};