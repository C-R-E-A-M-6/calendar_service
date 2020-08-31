DROP SCHEMA property CASCADE;

CREATE SCHEMA property;

  CREATE TABLE property.property_info(
    property_id SERIAL,
    rating DECIMAL(3,2),
    total_reviews SMALLINT,
    maximum_guests TINYINT,
    minimum_stay TINYINT,
    nightly_fee SMALLINT
  );

  /*
  GET request will look like
  SELECT * FROM property_info WHERE property_id = ?
  */

  CREATE TABLE property.reservations (
    reservation_id SERIAL,
    property_id INT,
    guests TINYINT,
    check_in DATE,
    check_out DATE
  );

  /*
  POST request will look like
  INSERT INTO RESERVATIONS (guests, check_in, check_out, property_id) VALUES (? ? ? ?)
  */

  -- CREATE TABLE property.days (
  --   property_id INT,
  --   rate SMALLINT,
  --   day_of_year SMALLINT,
  --   reservation_id INT
  -- );