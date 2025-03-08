# AniciaHW14
This is a shoe API that connects to a mongo database
Review and Plan:

Plan how to adapt your Week 13 API to use a database for data storage and retrieval.

I will Choose a database system : MongoDB

Install necessary packages for database integration (npm install mongoose for MongoDB).

I will have a GET route that retrieves shoe data (color&type): `/shoes`

an example of a shoe:
```json
{
    "type": "nike",
    "color": "color"
}
```
I will have a POST route that sends new data `/shoe`

I will have a PUT route that updates current data, or replaces exsisting data with new data `/shoe/:id`

I will have a DELETE route that will erase/delete data `/shoe`

I will Replace local storage operations with database queries.

Implementing Models:
If using MongoDB with Mongoose, define models that correspond to your data structure.
Ensure your route handlers use these models for database interactions.

