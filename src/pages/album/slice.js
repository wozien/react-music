import { createSlice } from '@reduxjs/toolkit'
import { getAlbumDetailRequest } from '@/api/request';

const slice = createSlice({
  name: 'album',
  initialState: {
    currentAlbum: {},
    enterLoading: true
  },
  reducers: {
    changeCurrentAlbum(state, { payload }) {
      state.currentAlbum = payload
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload
    }
  }
})

export const { changeCurrentAlbum, changeEnterLoading } = slice.actions

export const getAlbumDetail = id => {
  return dispatch => {
    getAlbumDetailRequest(id)
      .then(res => {
        const data = res.playlist;
        dispatch(changeEnterLoading(false));
        dispatch(changeCurrentAlbum(data));
      })
      .catch(() => {
        console.log('获取歌单详情失败');
      });
  };
};

export default slice.reducer