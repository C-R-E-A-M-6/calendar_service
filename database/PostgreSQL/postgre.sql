DROP DATABASE IF EXISTS property;

CREATE DATABASE property;

CREATE SCHEMA property;

USE property;

CREATE TABLE property_info(
  property_id SERIAL,
  maximum_guests SMALLINT,
  minimum_stay SMALLINT,
  nightly_fee SMALLINT,
  rating DECIMAL(3,2),
  total_reviews SMALLINT
);

CREATE TABLE reservations (
  reservation_id SERIAL,
  property_id INT,
  check_in DATE,
  check_out DATE,
  guests SMALLINT
);