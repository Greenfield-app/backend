const NEARBY_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function nearbySearch(coordinates) {

  try {
    // Make the API request
    const response = await axios.get(NEARBY_PLACES_API_URL, {
        params: {
            key: apiKey,
            location: coordinates,
            radius: 1500,
            type: 'food',
            keyword: 'restaurant',
        }
    });

    const results = response.data.results

    if (response.data.status === 'OK' && results.length) {
      const restaurants = results.map(restaurant => {

        return {
          'name': restaurant.name,
          'address': restaurant.vicinity,
          'placeID': restaurant.place_id,
          'coordinates': { 
            'lat': restaurant.geometry.location.lat,
            'long': restaurant.geometry.location.lng,
          },
          'photos': restaurant.photos && restaurant.photos.length > 0
            ? restaurant.photos[0].photo_reference : undefined,
          'priceLevel': restaurant.price_level,
          'rating': restaurant.rating,
          'totalReviews': restaurant.user_ratings_total
        }
      });
      
      return restaurants;
    } else {
      console.error(`No restaurants found nearby: ${response.data.status}`);
    }   
  } catch (error) {
    console.error(`Error fetching nearby restaurants:`, error);
    throw error;
  }
}

module.exports = nearbySearch;
  