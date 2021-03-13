# meetapi
A RESTful API for creating, storing Meetups in a database.

## Docs
Here are methods and stuff you can request. Replace `<url>` with the url where your API is hosted and configured.

Body content type can be:
* `Content-Type: application/json`
* `Content-Type: application/x-www-form-urlencoded`

### Find all Meetups
`GET <url>/api/meetups` - returns all Meetups in JSON form from database.

Responses:
* `200 OK` - Everything went well, responded with all meetups available.
* `500 Internal Server Error` - Unexpected server error, couldn't get any Meetups.

### Create a new Meetup
`POST <url>api/meetups` - creates new Meetup and returns

Body (all fields except `imageUrl`, `isFavorite` are required):
```js
{
    address: String,
    contactEmail: String,
    description: String,
    imageUrl: String,
    isFavorite: Boolean,
    subtitle: String,
    title: String
}
```

Responses:
* `200 OK` - OK, new Meetup successfully made.
* `500 Internal Server Error` - Unexpected server error, couldn't make a Meetup.
* `400 Bad Request` - Either one of the parameters was missing from body, contained profane language, or email address was disposable.
  * Error as response looks like this `{error: 'error-type', message: 'message'}`.

### Find a Meetup with specific ID
`GET <url>/api/meetups/:id` - looks for a specific Meetup

Responses:
* `200 OK` - Meetup found, responds with Meetup data
* `500 Internal Server Error` - Unexpected server error, couldn't find a Meetup.
* `404 Not Found` - Meetup was not found.

### Edit a Meetup with specific ID
`PATCH <url>/api/meetups/:id` - updates Meetup.

Body (all fields except `imageUrl`, `isFavorite` are required):
```js
{
    address: String,
    contactEmail: String,
    description: String,
    imageUrl: String,
    isFavorite: Boolean,
    subtitle: String,
    title: String
}
```

Responses:
* `200 OK` - Meetup updated.
* `500 Internal Server Error` - Unexpected server error, couldn't update Meetup.
* `404 Not Found` - Meetup was not found.
* `400 Bad Request` - Either one of the parameters was missing from body, contained profane language, or email address was disposable.
  * Error as response looks like this `{error: 'error-type', message: 'message'}`.

### Toggle favorite on a Meetup with specific ID
`PATCH <url>/api/meetups/:id/favToggle` - toggles `isFavorite` boolean, kind of like updating process.

Body:
```js
{
    isFavorite: Boolean
}
```

Responses:
* `200 OK` - Meetup updated (isFavorite).
* `500 Internal Server Error` - Unexpected server error, couldn't update Meetup.
* `404 Not Found` - Meetup was not found.

### Delete a Meetup with specific ID
`DELETE <url>/api/meetups/:id` - Deletes a Meetup

Responses:
* `200 OK` - Meetup deleted successfully.
* `500 Internal Server Error` - Unexpected server error, couldn't delete Meetup.
* `404 Not Found` - Meetup was not found.

### Delete ALL Meetups (not recommended)
`DELETE <url>/api/meetups` - Deletes all Meetups

Responses:
* `200 OK` - All meetups deleted successfully.
* `500 Internal Server Error` - Unexpected server error, couldn't delete Meetups.

#

ellartdev 2020
