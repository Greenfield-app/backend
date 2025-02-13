const Records = require('../models/recordModel')

// Function to fetch Eat History by user
async function getRecordsByUser (req, res) {
    try {
        const { userId } = req.params; 
        const records = await Records.filterByUserId(userId);
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addRestaurantToRecords (req, res) {
    try {
        const { userId, restaurantId } = req.params;
        const timestamp = new Date().toISOString();
        await Records.add({ 
            'user_id': userId,
            'restaurant_id': restaurantId,
            'record_at': timestamp,
        });
        res.json({ message: 'Restaurant added to records successfully'});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRecordsByUser, addRestaurantToRecords };