DROP SCHEMA IF EXISTS sdc CASCADE;

CREATE SCHEMA sdc;

DROP DATABASE IF EXISTS properties;

CREATE DATABASE properties OWNER sdc;

USE properties;

CREATE TABLE property_info(
  property_id SERIAL PRIMARY KEY,
  maximum_guests SMALLINT,
  minimum_stay SMALLINT,
  nightly_fee SMALLINT,
  rating DECIMAL(3,2),
  total_reviews SMALLINT
);

CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  property_id INT,
  check_in DATE,
  check_out DATE,
  guests SMALLINT,
  FOREIGN KEY (property_id) REFERENCES property_info(property_id)
);