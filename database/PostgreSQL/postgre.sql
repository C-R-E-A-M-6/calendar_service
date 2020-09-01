DROP DATABASE IF EXISTS property;

CREATE DATABASE property;

CREATE SCHEMA property;

USE property;

  CREATE TABLE property_info(
    property_id SERIAL,
    rating DECIMAL(3,2),
    total_reviews SMALLINT,
    maximum_guests SMALLINT,
    minimum_stay SMALLINT,
    nightly_fee SMALLINT
  );

  CREATE TABLE reservations (
    reservation_id SERIAL,
    property_id INT,
    guests SMALLINT,
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