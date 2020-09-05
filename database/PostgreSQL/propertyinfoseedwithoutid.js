const fs = require('fs');

const writePropertyInfo = fs.createWriteStream('noIdPropertyInfo.csv');
writePropertyInfo.write('maximum_guests,minimum_stay,nightly_fee,rating,total_reviews\n', 'ascii');

function writeNewPropertyInfo(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const maximumGuests = [2, 8, 4][i % 3];

      const minimumStay = [1, 2, 3][i % 3];

      const nightlyFee = [76, 98, 120, 167, 203][i % 5];

      const rating = [3.33, 5.00, 4.20, 4.69, 4.99, 3.87, 4.89, 4.27][i % 8];

      const totalReviews = [11, 42, 115, 58, 32, 99, 45, 66][i % 8];

      const data = `${maximumGuests},${minimumStay},${nightlyFee},${rating},${totalReviews}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeNewPropertyInfo(writePropertyInfo, 'ascii', () => {
  writePropertyInfo.end();
});
