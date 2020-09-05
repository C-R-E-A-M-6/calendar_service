DROP KEYSPACE properties;
/*
build cassandra schema based on queries
*/
CREATE KEYSPACE properties WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor': 1};

USE properties;

/*
took out service fee and cleaning fee because they are calculated as a percentage of total cost and can be calculated in the server later
*/

CREATE TABLE property_info (
  property_id INT,
  rating DECIMAL,
  total_reviews INT,
  maximum_guests INT,
  minimum_stay INT,
  nightly_fee INT,
  PRIMARY KEY (property_id)
);

/*
this would be the table for adding or updating a reservation
could also use for get request
data will be clustered on the basis of reservation_id
*/

CREATE TABLE reservations_by_property (
  reservation_id INT,
  property_id INT,
  guests INT,
  check_in VARCHAR,
  check_out VARCHAR,
  PRIMARY KEY ((property_id, reservation_id), check_in)
);

/*
this will be used to populate the calendar for the user to see what has been booked
*/

CREATE TABLE days_of_year (
  reservation_id INT,
  property_id INT,
  day_of_year DATE,
  rate SMALLINT,
  PRIMARY KEY (property_id, day_of_year)
);

CREATE TABLE reservations (
  reservation_id INT,
  property_id INT,
  guests INT,
  check_in VARCHAR,
  check_out VARCHAR,
  PRIMARY KEY ((property_id, reservation_id), check_in)
);