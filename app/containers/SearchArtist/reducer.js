import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import produce from 'immer';
export const {
  Types: searchArtistTypes,
  Creators: searchArtistActions
} = createActions({
  // Fetch user informations
  requestFetchArtist: ['name'],
  // Artist information was successfully fetched
  successFetchArtist: ['artist'],
  // An error occurred
  failureFetchArtist: ['errorMessage']
});

export const initialState = fromJS({
  artist: [],
  userIsLoading: false,
  userErrorMessage: null
});

export const fetchArtist = state => state.set('userIsLoading', true).set('userErrorMessage', null)

export const successFetchArtist = (state, { artist }) =>
  state
    .set('artist', artist)
    .set('userIsLoading', false)
    .set('userErrorMessage', null);

export const failureFetchArtist = (state, { errorMessage }) =>
  state
    .set('artist', [])
    .set('userIsLoading', false)
    .set('userErrorMessage', errorMessage);

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const artistContainerReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case searchArtistTypes.REQUEST_FETCH_ARTIST:
        return fetchArtist(state, action);
      case searchArtistTypes.SUCCESS_FETCH_ARTIST:
        return successFetchArtist(state, action);
      case searchArtistTypes.FAILURE_FETCH_ARTIST:
        return failureFetchArtist(state, action);
      default:
        return state;
    }
  });
