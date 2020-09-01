#!/bin/bash
psql postgres -U sdc -d property -c "COPY property_info(property_id, rating, total_reviews, maximum_guests, minimum_stay, nightly_fee)
FROM '$(pwd)/propertyInfo.csv'
DELIMITER ','
CSV HEADER"