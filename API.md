# Airbnb Calendar CRUD API

## Server API

### Get reservation info for a specific property
  * GET `/property/:property_id/reservation`

**Path Parameters:**
  * `property_id` property id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "nightly_fee": "Number",
      "rating": "Number",
      "reviews": "Number",
      "maximum_guests": "Number",
      "check_in": "Date",
      "check_out": "Date",
      "minimum_stay": "Number",
      "reservation_id": "Number",
      "nights": "Number"
    }
```

### Add reservation
  * POST `/property/:property_id/reservation`

**Path Parameters:**
  * `property_id` property id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "reservation_id": "Number",
      "check_in": "Date",
      "check_out": "Date",
      "guests": "Number"
    }
```


### Update reservation info
  * PUT `/property/:property_id/reservation/:reservation_id`

**Path Parameters:**
  * `property_id` property id
  * `reservation_id` reservation_id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "guests": "Number",
      "check_in": "Date",
      "check_out": "Date"
    }
```

### Delete reservation
  * DELETE `/property/:property_id/reservation/:reservation_id`

**Path Parameters:**
  * `property_id` property id
  * `reservation_id` reservation id

**Success Status Code:** `204`