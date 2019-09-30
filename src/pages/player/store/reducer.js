import * as types from './constants';
import { fromJS } from 'immutable';
import { playMode } from '../../../api/config';

const defaultState = fromJS({
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentSong: {},
  showPlayList: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_SONG:
      return state.set('currentSong', action.data);
    case types.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data);
    case types.SET_PLAYING_STATE:
      return state.set('playing', action.data);
    case types.SET_SEQUECE_PLAYLIST:
      return state.set('sequencePlayList', action.data);
    case types.SET_PLAYLIST:
      return state.set('playList', action.data);
    case types.SET_PLAY_MODE:
      return state.set('mode', action.data);
    case types.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.data);
    case types.SET_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data);
    default:
      return state;
  }
};
