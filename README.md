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

<p>DB_USER=<br>
DB_PASSWORD=<br>
PORT=<br>
SESSION_SECRET=<br>
SPOONACULAR_API_KEY= (https://spoonacular.com/food-api go this site and get a free key)<br>
SPOONACULAR_BASE_URL=https://api.spoonacular.com/<br>
GOOGLE_MAPS_API_KEY= (go google places api, get a 90 day free trail )<br>
GOOGLE_PLACES_BASE_URL=https://maps.googleapis.com/maps/api/place<br>
<p/>

Fill in this fields with the information that matches your local database setup.

### running migrations and seeds

Next, in the backend root directory, run:

`npm run migrate-latest`

and 

`npm run seed-data`

This will run the migrations and seeds for the database

### starting the server

To start the server, run `npm start`

Now, your server should be good to go!

