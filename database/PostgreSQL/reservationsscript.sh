#!/bin/bash
psql -U sdc -d property -c "COPY reservations(property_id, reservation_id, guests, check_in, check_out)
FROM '$(pwd)/reservations.csv'
DELIMITER ','
CSV HEADER"