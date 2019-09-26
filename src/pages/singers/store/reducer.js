import * as types from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  singerList: [],
  pageCount: 0,
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data);
    case types.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case types.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case types.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case types.CHANGE_PULLDOWM_LOADING:
      return state.set('pullDownLoading', action.data);
    default:
      return state;
  }
};
