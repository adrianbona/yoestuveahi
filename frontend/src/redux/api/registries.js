import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getRegistries() {
  return instance.get('/registry/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function createRegistry({ id: locationId, siteSource }) {
  if (parseInt(siteSource, 10) === 1) {
    return instance.post(
      '/registry/',
      {
        included_in: locationId
      },
      {
        headers: {
          Authorization: `token ${getUserToken()}`
        }
      }
    );
  }

  return instance.post(
    `/registry/external/${siteSource}/${locationId}/`,
    {},
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
