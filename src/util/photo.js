const PHOTO = 'https://maps.googleapis.com/maps/api/place/photo';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function getPhoto(photoReference) {

    try {
      const response = await axios.get(PHOTO, {
        params: { 
          key: apiKey,
          photo_reference: photoReference,
          maxheight: 800,
          maxwidth: 1200,
        },
        responseType: 'arraybuffer', //data is returned in binary form
      });
      
      const photoUrl = response.request.res.responseUrl;
      return photoUrl; 
    } catch (error) {
      console.error(`Error fetching photo: `, error);
      throw error;
    }
  }

  module.exports = getPhoto;
