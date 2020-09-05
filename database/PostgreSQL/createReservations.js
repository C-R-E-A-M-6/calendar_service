const moment = require('moment');

const createReservations = (numOfReservations, startDate) => {
  // const reservationLength = [1, 2, 3, 4, 5, 6, 7];
  const reservations = [];
  let checkIn = startDate;
  for (let i = 1; i <= numOfReservations; i += 1) {
    let reservation = {};
    reservation.checkIn = checkIn;
    const checkOut = moment(checkIn).add(Math.ceil(Math.random() * 7), 'days').format('YYYY-MM-DD');
    reservation.checkOut = checkOut;
    reservations.push(reservation);
    checkIn = moment(checkOut).add(Math.floor(Math.random() * 7), 'days').format('YYYY-MM-DD');
  }
  return reservations;
};

module.exports = createReservations;
