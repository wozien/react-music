import { createSlice } from '@reduxjs/toolkit'
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from '@/api/request';

const slice = createSlice({
  name: 'search',
  initialState: {
    hotList: [],
    suggestList: [],
    songsList: [],
    enterLoading: false
  },
  reducers: {
    changeHotKeyWords(state, { payload }) {
      state.hotList = payload
    },
    changeSuggestList(state, { payload }) {
      state.suggestList = payload
    },
    changeResultSongs(state, { payload }) {
      state.songsList = payload
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload
    }
  }
})

export const { changeHotKeyWords, changeSuggestList, changeResultSongs, changeEnterLoading } = slice.actions

export const getHotKeyWords = () => {
  return dispatch => {
    getHotKeyWordsRequest().then(data => {
      let list = data.result.hots;
      dispatch(changeHotKeyWords(list));
    })
  }
};
export const getSuggestList = (query) => {
  return dispatch => {
    getSuggestListRequest(query).then(data => {
      if(!data)return;
      let res = data.result || [];
      dispatch(changeSuggestList(res));
    })
    getResultSongsListRequest(query).then(data => {
      if(!data)return;
      let res = data.result.songs || [];
      dispatch(changeResultSongs(res));
      dispatch(changeEnterLoading(false));
    })
  }
};

export default slice.reducer