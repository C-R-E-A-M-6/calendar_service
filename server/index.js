// Dependency
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const expressStaticGzip = require("express-static-gzip");
const db = require('../database/PostgreSQL/index.js');

const app = express();
const PORT = 3002;
const publicPath = path.join(__dirname, '/../public');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/rooms/:room_id', expressStaticGzip(publicPath, {
  enableBrotli: true,
  orderPreference: ['br'],
}));

// Route
// GET request to '/rooms/:room_id/reservation' route
app.get('/rooms/:room_id/reservation', (req, res) => {
  // declare query string
  let queryString = 'SELECT * FROM property_info, reservations WHERE property_info.property_id = $1 AND reservations.property_id = property_info.property_id ORDER BY reservations.check_in;';
  // declare query params
  let queryParams = [req.params.room_id];
  // get all the informations and reservations of a specify room with the room_id from the endpoint
  db.query(queryString, queryParams, function(error, results, fields){
    if (error) {
      console.log("Failed to get data from databases: ", error);
      res.status(404).send(error);
    } else {
      let dates = [];
      for (let j = 0; j < results.rows.length; j++) {
        let oneRes = results.rows[j];
        let checkIn = moment(oneRes.check_in);
        let checkOut = moment(oneRes.check_out);
        // console.log('oneRes ', oneRes.check_in);
        for (let i = checkIn; i <= checkOut; checkIn.add(1, 'days')) {
          dates.push(checkIn.format('YYYY-MM-DD'));
        }
      }
      console.log("Succeed to get data from databases");
      results.rows.push(dates);
      res.status(200).send(results.rows);
    }
  });
});

// POST request to '/rooms/:room_id/reservation' route
app.post('/rooms/:room_id/reservation', (req, res) => {
  // get the check_in date from request
  let check_in = moment(req.body.check_in);
  console.log('req.body.check_in ', typeof req.body.check_in);
  // get the check_out date from request
  let check_out = moment(req.body.check_out);
  // create a list of dates in YYYY-MM-DD format that started from the check_in date to the check_out date
  let dates = [];
  for (let i = check_in; i <= check_out; check_in.add(1, 'days')) {
    dates.push(check_in.format('YYYY-MM-DD'));
  }
    // declare query string
    let queryString = 'INSERT INTO reservations (room_id, booked_date) VALUES (?, ?)';
    // declare query params
    let queryParams = [req.params.room_id, dates[i]];
    // insert current date into reservations table where room_id is equal to the room_id from the endpoint
    db.connection.query(queryString, queryParams, (error, results, fields) => {
      if (error) {
        console.log(`Failed to insert data to reservations table where room id = ${req.params.room_id}: `, error);
        res.status(404).send(error);
      } else {
        console.log(`Success to insert data to reservations table where room id = ${req.params.room_id}`);
        res.status(200).send();
      }
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
