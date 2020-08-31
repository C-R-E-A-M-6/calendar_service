const fs = require('fs');
const moment = require('moment');

const writeReservations = fs.createWriteStream('reservations.csv');
writeReservations.write(`property_id,reservation_id,guests,check_in,check_out\n`, 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  let d = 0;
  function write() {
    let ok = true;
    do {

      d += 1;
      let numOfReservations = 5;

      let dateWithinThreeMonths = new Date(moment().add(91, 'days'));

      const guests = [2, 4, 6][i % 3];

      let checkIn = new Date(Math.random() * (moment(dateWithinThreeMonths) - moment()) + moment());

      checkIn = moment(checkIn).format('YYYY-MM-DD');

      let checkOut = moment(checkIn).add(3, 'days').format('YYYY-MM-DD');

      const data = `${i},${d},${guests},${checkIn},${checkOut}\n`;

      if (d === 5) {
        d = 0;
        i -= 1;
        id += 1;
      }


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
write()
}

writeTenMillionUsers(writeReservations, 'utf-8', () => {
  writeReservations.end();
});