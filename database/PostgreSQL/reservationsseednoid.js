const fs = require('fs');
const moment = require('moment');
const createReservations = require('./createReservations.js');

const writeReservations = fs.createWriteStream('4noidreservations.csv');
writeReservations.write('property_id,check_in,check_out,guests\n', 'ascii');

const reservationNumber = [1, 5, 5, 5, 5, 20, 20, 20, 20, 20, 50];

function writeNewReservations(writer, encoding, callback) {
  let i = 2500000;
  let d = 1;
  function write() {
    let ok = true;
    let reservationIndex = 0;
    let numOfReservations = reservationNumber[i % reservationNumber.length];
    let reservations = createReservations(numOfReservations, moment().format('YYYY-MM-DD'));
    do {
      // const guests = [4, 2, 6][i % 3];
      const maximumGuests = [8, 2, 4][i % 3];

      const guests = [maximumGuests - 1, maximumGuests][d % 2];

      // get a reservation
      const reservation = reservations[reservationIndex];

      const data = `${i},${reservation.checkIn},${reservation.checkOut},${guests}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        d += 1;
        reservationIndex += 1;
        if (d % numOfReservations === 0) {
          i -= 1;
          d = 1;
          reservationIndex = 0;
          numOfReservations = reservationNumber[i % reservationNumber.length];
          reservations = createReservations(numOfReservations, moment().format('YYYY-MM-DD'));
        }
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

writeNewReservations(writeReservations, 'ascii', () => {
  writeReservations.end();
});
