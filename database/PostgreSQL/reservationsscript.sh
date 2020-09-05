#!/bin/bash
psql -U sdc -d property -c "COPY reservations(property_id, check_in, check_out, guests)
FROM '$(pwd)/noidreservations.csv'
DELIMITER ','
CSV HEADER"