const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')

// Function to fetch nearby restaurants based on location
async function getNearbyRestaurants (req, res) {
    const { location } = req.query;
    
    // Check if location is provided
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

	try {
        // Get geocoding data for the provided location
        const locationCoordinates = await getGeocodingData(location);

        // Get nearby restaurants based on location coordinates
		const listOfNearbyRestaurants = await nearbySearch(locationCoordinates);

        res.json(listOfNearbyRestaurants);
    } catch (error) {
        console.error('Error fetching nearby restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getNearbyRestaurants };