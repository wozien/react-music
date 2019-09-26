import { getRankListRequest } from '../../../api/request';
import { fromJS } from 'immutable';

// constants
const CHANGE_RANK_LIST = 'rank/CHANGE_RANK_LIST';
const CHANGE_LOADING = 'rank/CHANGE_LOADING';

// actions
const changeRankList = data => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
});

const changeLoading = data => ({
  type: CHANGE_LOADING,
  data
});

export const getRankList = () => {
  return dispatch => {
    getRankListRequest().then(res => {
      let list = res && res.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    });
  };
};

// reducer
const defaultState = fromJS({
  loading: true,
  rankList: []
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set('rankList', action.data);
    case CHANGE_LOADING:
      return state.set('loading', action.data);
    default:
      return state;
  }
};

export { reducer };
