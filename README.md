# What's Eat - Backend

This is the backend repo for What's eat. It contains the server implemented with Node Express, and migrations/seeds for the database using knex.

To use the backend with the front end, you will also need this repo: https://github.com/Greenfield-app/frontend

## Getting Started

### Setting up dependencies

Download this repo. 

Then in the backend root directory, run: 

`npm install` 

This will install the dependencies for the backend

Next, you will need to make sure you have postgres installed on your computer.

Once you have postgres, create a database in your local postgres called "appdata"

### .env.local

In the backend root directory, create a .env.local file with the following fields:

`DB_USER=
DB_PASSWORD=
PORT=
SESSION_SECRET=`

Fill in this fields with the information that matches your local database setup.

### running migrations and seeds

Next, in the backend root directory, run:

`npm run migrate-latest`

and 

`npm run seed-data`

This will run the migrations and seeds for the database

*** starting the server

To start the server, run `npm start`

Now, your server should be good to go!

