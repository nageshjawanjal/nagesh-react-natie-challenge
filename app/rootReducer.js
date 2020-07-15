import { combineReducers } from 'redux';
import configureStore from 'app/utils/createStore';
import rootSaga from 'app/rootSaga';
import { exampleContainerReducer as example } from 'app/containers/ExampleScreen/reducer';
import { artistContainerReducer as artist } from 'app/containers/SearchArtist/reducer';

export default () => {
  const rootReducer = combineReducers({
    example,artist
  });

  return configureStore(rootReducer, rootSaga);
};
