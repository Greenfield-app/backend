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

module.exports = { getRecordsByUser };