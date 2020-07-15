import { create } from 'apisauce';
import mapKeysDeep from 'map-keys-deep';
import { camelCase, snakeCase } from 'lodash';
import { Config } from 'app/config';

export const apiClients = {
  configApi: null,
  default: null
};
export const getApiClient = (type = 'configApi') => apiClients[type];
export const generateApiClient = (type = 'configApi') => {
  switch (type) {
    case 'configApi':
      apiClients[type] = createApiClientWithTransForm(Config.API_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(Config.API_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  // api.addResponseTransform(response => {
  //   const { ok, data } = response;
  //   if (ok && data) {
  //     response.data = mapKeysDeep(data, keys => camelCase(keys));
  //   }
  //   return response;
  // });

  // api.addRequestTransform(request => {
  //   alert(JSON.stringify(request))
  //   const { data } = request;
  //   if (data) {
  //     request.data = mapKeysDeep(data, keys => snakeCase(keys));
  //   }
  //   return request;
  // });
  // api
  // .get('/search?term=Akon')
  // .then(response => alert(JSON.stringify(response)))
  // .then(e =>{ alert("error"); })
  return api;
};
