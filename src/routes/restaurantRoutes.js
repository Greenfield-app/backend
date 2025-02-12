const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/nearby', restaurantController.getNearbyRestaurants);

module.exports = router;