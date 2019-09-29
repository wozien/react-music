import * as types from './constants';
import { fromJS } from 'immutable';
import { getAlbumDetailRequest } from '../../../api/request';

export const changeEnterLoading = data => ({
  type: types.CHANGE_LOADING,
  data
});

export const changeCurrentAlbum = data => ({
  type: types.CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

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
