import * as types from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: true
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data);
    case types.CHANGE_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
};
