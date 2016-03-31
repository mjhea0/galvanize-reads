## Galvanize Reads

## Quick Start

1. Clone and install dependencies
1. Create the DB in psql - `create database galvanize_reads;`
1. Run the migrations - `knex migrate:latest`
1. Seed the DB - `knex seed:run`
1. Run the app - `npm start` or `nodemon`
1. Run the tests - `npm test`

> In development, you can convert a user to an admin via this endpoint: http://localhost:3000/auth/make-admin (you must be logged in as a regular user first)