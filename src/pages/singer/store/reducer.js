import * as types from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  artist: {},
  hotSongs: [],
  enterLoading: true
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_ARTIST:
      return state.set('artist', action.data);
    case types.CHANGE_HOT_SONGS:
      return state.set('hotSongs', action.data);
    case types.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
};
