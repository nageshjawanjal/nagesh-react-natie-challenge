import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtist } from 'app/services/UserService';
import { searchArtistActions, searchArtistTypes } from './reducer';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */

export function* fetchArtist(action) {
  const response = yield call(getArtist ,action.name);
    
  if (response.ok) {
    const { results } = response.data;
    yield put(searchArtistActions.successFetchArtist(results));
  } else {
    yield put(
      searchArtistActions.failureFetchUser(
        'There was an error while fetching user informations.'
      )
    );
  }
}

export default function* SearchArtistSaga() {
  yield takeLatest(searchArtistTypes.REQUEST_FETCH_ARTIST, fetchArtist);
}
