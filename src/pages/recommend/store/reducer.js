import * as types from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  loading: true
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case types.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    case types.CHANGE_LOADING:
      return state.set('loading', action.data);
    default:
      return state;
  }
};
