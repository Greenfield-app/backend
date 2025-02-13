const nearbySearch = require('../util/nearbySearch');
const getGeocodingData = require('../util/geocoding');
const getPhoto = require('../util/photo');
const Restaurants = require('../models/restaurantModel')

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

// Function to add a new restaurant to the database
async function addRestaurant (req, res) {
    const restaurant = req.body;

    // Ensure required fields are provided
    if(restaurant.name || !restaurant.placeID) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Save the restaurant in the database
    const newRestaurant = await Restaurants.add(restaurant);

    if (newRestaurant) {
        res.status(201).json({
            message: 'Restaurant added successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid data')
    }
}

async function getRestaurantByPlaceId (req, res) {
    try {
        const { placeID } = req.params; 
        const restaurant = await Restaurants.findByPlaceID(placeID);
        res.json({ 'id': restaurant.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getNearbyRestaurants, getPhotoOfRestaurant, addRestaurant, getRestaurantByPlaceId };