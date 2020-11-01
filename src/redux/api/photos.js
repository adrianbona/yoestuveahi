import { google_instance } from './axios';

function getPhotos(placeId) {
  const params = {
    place_id: placeId, // ChIJ_2CsxHTKvJURLaDW-OTUCaI
    key: 'AIzaSyDAvfXiXVeMN803sCuPUexOzkVy-dgnqdE',
    fields: 'photos'
  };
  return google_instance.get('/maps/api/place/details/json', { params });
}

export default getPhotos;
