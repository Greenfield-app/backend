const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/nearby', restaurantController.getNearbyRestaurants);
router.get('/photo', restaurantController.getPhotoOfRestaurant);
router.post('/new', restaurantController.addRestaurant);
router.get('/:placeID', restaurantController.getRestaurantByPlaceId);


module.exports = router;