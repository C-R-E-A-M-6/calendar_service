DROP SCHEMA property CASCADE;

CREATE SCHEMA property;

  CREATE TABLE property.property_info(
    property_id INT PRIMARY KEY,
    rating DECIMAL(3,2),
    total_reviews SMALLINT,
    maximum_guests TINYINT,
    minimum_stay TINYINT
  );

  /*
  GET request will look like
  SELECT * FROM property_info WHERE property_id = ?
  */

  CREATE TABLE property.reservations (
    reservation_id INT,
    property_id INT,
    adults TINYINT,
    children TINYINT,
    infants TINYINT,
    check_in DATE,
    check_out DATE
  );

  /*
  POST request will look like
  INSERT INTO RESERVATIONS (guests, check_in, check_out, property_id) VALUES (? ? ? ?)
  */

  CREATE TABLE property.days (
    property_id INT,
    rate SMALLINT,
    day_of_year SMALLINT,
    reservation_id INT
  );