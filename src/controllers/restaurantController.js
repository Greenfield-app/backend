const nearbySearch = require('../util/nearbySearch');
const getGeocodingData = require('../util/geocoding');
const getPhoto = require('../util/photo');

// Function to fetch nearby restaurants based on location
async function getNearbyRestaurants (req, res) {
    const { location, coordinates } = req.query;
    
    // Check if location is provided
    if (!location || !coordinates) {
        return res.status(400).json({ error: 'Location or coordinates query parameter is required' });
    }
    
	try {

        if (coordinates) {
            // Get nearby restaurants based on coordinates
            const listOfNearbyRestaurants = await nearbySearch(coordinates);
            res.json(listOfNearbyRestaurants);
        } else {
            // Get geocoding data for the provided location
            const locationCoordinates = await getGeocodingData(location);        
            // Get nearby restaurants based on location coordinates
            const listOfNearbyRestaurants = await nearbySearch(locationCoordinates);
            res.json(listOfNearbyRestaurants);
        } 
        
    } catch (error) {
        console.error('Error fetching nearby restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to get a photo for a restaurant using its photo reference
async function getPhotoOfRestaurant (req, res) {
    const { photo_reference } = req.query;
    
    // Check if photo reference is provided
    if (!photo_reference) {
        return res.status(400).json({ error: 'Photo reference query parameter is required' });
    }

    try {
        // Get the photo using the provided reference
        const photoUrl = await getPhoto(photo_reference);
        res.send(photoUrl);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}        
}

module.exports = { getNearbyRestaurants, getPhotoOfRestaurant };