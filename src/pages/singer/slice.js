import { createSlice } from '@reduxjs/toolkit'
import { getSingerInfoRequest } from '@/api/request';

const slice = createSlice({
  name: 'singer',
  initialState: {
    artist: {},
    hotSongs: [],
    enterLoading: true
  },
  reducers: {
    changeArtist(state, { payload }) {
      state.artist = payload
    },
    changeHotSongs(state, { payload }) {
      state.hotSongs = payload
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload
    }
  }
})

export const { changeArtist, changeHotSongs, changeEnterLoading } = slice.actions

export const getSingerInfo = id => {
  return dispatch => {
    getSingerInfoRequest(id)
      .then(res => {
        dispatch(changeEnterLoading(false));
        dispatch(changeArtist(res.artist));
        dispatch(changeHotSongs(res.hotSongs));
      })
      .catch(() => {
        console.log('获取歌手详情失败');
      });
  };
};

export default slice.reducer