import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

export const selectArtistDomain = state => 
(state.artist || initialState).toJS();

export const selectExampleDomain = state => 
(state.example || initialState).toJS();

export const selectArtist = () =>
  createSelector(
    selectArtistDomain,
    substate => get(substate, 'artist', null)
  );

export const selectUserIsLoading = () =>
  createSelector(
    selectArtistDomain,
    substate => get(substate, 'userIsLoading', null)
  );

export const selectUserErrorMessage = () =>
  createSelector(
    selectArtistDomain,
    substate => get(substate, 'userErrorMessage', null)
  );
