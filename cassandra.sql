/*
build cassandra schema based on queries
*/
CREATE KEYSPACE property with replication =
  {'class': 'SimpleStrategy', 'replication_factor': 1};

/*
took out service fee and cleaning fee because they are calculated as a percentage of total cost and can be calculated in the server later
*/

CREATE TABLE properties (
  property_id INT,
  maximum_guests TINYINT,
  rating DECIMAL(3,2),
  total_reviews SMALLINT,
  minimum_stay TINYINT,
  PRIMARY KEY (property_id)
);

/*
this would be the table for adding or updating a reservation
could also use for get request
data will be clustered on the basis of reservation_id
*/

CREATE TABLE reservations_by_property (
  property_id INT,
  reservation_id INT,
  adults TINYINT,
  children TINYINT,
  infants TINYINT,
  booked_date DATE,
  PRIMARY KEY ((property_id, reservation_id), booked_date)
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