#!/bin/bash
psql -U sdc -d property -c "COPY property_info(maximum_guests, minimum_stay, nightly_fee, rating, total_reviews)
FROM '$(pwd)/noIdPropertyInfo.csv'
DELIMITER ','
CSV HEADER"