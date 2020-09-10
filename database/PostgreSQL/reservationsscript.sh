#!/bin/bash
psql -U sdc -d properties -c "COPY reservations(property_id, check_in, check_out, guests)
FROM '$(pwd)/noidreservations.csv'
DELIMITER ','
CSV HEADER"

sudo -u postgres psql -d properties -c "COPY reservations(property_id, check_in, check_out, guests)
FROM '$(pwd)/4noidreservations.csv'
DELIMITER ','
CSV HEADER"