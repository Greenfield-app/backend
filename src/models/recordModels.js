const knex = require('../knex');

const Records = {
    
    filterByUserId(id) {
    return knex
        .select({
            name: 'food.foodname',
            date: 'record.record_at',
        })
        .from('record')
        .innerJoin('food', function () {
            this.on('food.id', '=', 'record.food_id');
        })
        .innerJoin('users as u', function () {
            this.on('u.id', '=', 'record.user_id');
        })
        .where({ 'record.user_id': id })
        .orderBy('record.record_at', 'desc')
    }
}

module.exports = Records;