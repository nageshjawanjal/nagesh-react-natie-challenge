import { generateApiClient } from 'app/utils/apiUtils';

const configApi = generateApiClient('configApi');
export const getArtist = artistName => configApi.get(`/search?term=${artistName}`);
// export const getUser = () => configApi.get('quotes?count=1');
