import { fork } from 'redux-saga/effects';
import exampleSaga from 'app/containers/ExampleScreen/saga';
import startupSaga from 'app/containers/RootScreen/saga';
import SearchArtist from 'app/containers/SearchArtist/saga';

export default function* root() {
  yield fork(exampleSaga);
  yield fork(startupSaga);
  yield fork(SearchArtist);
}
