const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

router.get('/:userId', recordController.getRecordsByUser);
router.post('/:userId/restaurantId', recordController.addRestaurantToRecords);

module.exports = router;