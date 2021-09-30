import { createSlice } from '@reduxjs/toolkit'
import { getRankListRequest } from '@/api/request';

const slice = createSlice({
  name: 'rank',
  initialState: {
    loading: true,
    rankList: []
  },
  reducers: {
    changeRankList(state, { payload }) {
      state.rankList = payload
    },
    changeLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const { changeRankList, changeLoading } = slice.actions

export const getRankList = () => {
  return dispatch => {
    getRankListRequest().then(res => {
      let list = res && res.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    });
  };
};

export default slice.reducer