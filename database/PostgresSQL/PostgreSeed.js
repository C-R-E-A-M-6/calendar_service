const fs = require('fs');
const moment = require('moment');

/* id will be incremented, but data will be formatted like
rating,totalReviews,maximumGuests,minimumStay
*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const seedPropertyInfo = (entries) => {
  const rating = [3.33, 5.00, 4.20, 4.69, 4.99, 3.87, 4.89, 4.27];

  const totalReviews = [11, 42, 115, 58, 32, 99, 45, 66];

  const maximumGuests = [2, 4, 8];

  const minimumStay = [1, 2, 3];

  const nightlyFee = [76, 98, 120, 167, 203];

  let propertyInfo = `rating, total_reviews, maximum_guests, minimum_stay, nightlyfee\n`;

  for (let i = 1; i < entries; i += 1) {
    propertyInfo += `${rating[i%8]}, ${totalReviews[i%8]}, ${maximumGuests[i%3]}, ${minimumStay[i%3]}, ${nightlyFee[i%5]}\n`;
  }
  return new Promise ((resolve, reject) => {
    fs.writeFile('./PropertyInfo.csv', propertyInfo, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

seedPropertyInfo(10)
  .then(() => { console.log('success'); })
  .catch(() => { console.log('something went wrong'); })

const seedReservations = (entries) => {
  let reservationInfo = `property_id, reservation_id, guests, check_in, check_out\n`;

  for (let i = 1; i < entries; i += 1) {

    let numOfReservations = 5;

    for (let d = 1; d <= numOfReservations; d += 1) {
      let dateWithinThreeMonths = new Date(moment().add(91, 'days'));

      const guests = [2, 4, 6];

      let checkIn = new Date(Math.random() * (moment(dateWithinThreeMonths) - moment()) + moment());

      checkIn = moment(checkIn).format('YYYY-MM-DD');

      let checkOut = moment(checkIn).add(3, 'days').format('YYYY-MM-DD');

      reservationInfo += `${i}, ${d}, ${guests[i%3]}, ${checkIn}, ${checkOut}\n`;
    }
  }

  return new Promise ((resolve, reject) => {
    fs.writeFile('Reservations.csv', reservationInfo, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

seedReservations(10)
  .then(() => { console.log('reservations were seeded'); })
  .catch(() => { console.log('error seeding reservations'); })