# Airbnb Calendar CRUD API

## Server API

### Get info for a specific property
  * GET `/properties/:property_id/`

**Path Parameters:**
  * `property_id` property id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "rating": "Number",
      "reviews": "Number",
      "maximum_guests": "Number",
      "minimum_stay": "Number",
      "rate": "Number"
    }
```

### Get reservation info for a specific property
  * GET `/properties/:property_id/reservations`

**Path Parameters:**
  * `property_id` property id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "reservations": [{
        "check_in": "Date",
        "check_out": "Date"
      }],
      "rate": "Number"
    }
```

### Add reservation
  * POST `/properties/:property_id/reservations`

**Path Parameters:**
  * `property_id` property id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "reservation_id": "Number",
      "check_in": "Date",
      "check_out": "Date",
      "adults": "Number",
      "children": "Number",
      "infants": "Number"
    }
```


### Update reservation info
  * PUT `/reservations/:reservation_id`

**Path Parameters:**
  * `reservation_id` reservation_id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
      "check_in": "Date",
      "check_out": "Date"
    }
```

### Delete reservation
  * DELETE `/properties/:property_id/reservations/:reservation_id`

**Path Parameters:**
  * `property_id` property id
  * `reservation_id` reservation id

**Success Status Code:** `204`