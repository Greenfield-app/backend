const knex = require('../knex');

const Restaurants = {

    findByPlaceID: async (placeID) => {
        return knex('food').where('description', placeID).first();
    },

    add: async (restaurant) => {
        return knex('food').insert(restaurant).returning('*');
    }
}

module.exports = Restaurants;