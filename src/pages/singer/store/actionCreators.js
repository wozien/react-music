import * as types from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest } from '../../../api/request';

const changeArtist = data => ({
  type: types.CHANGE_ARTIST,
  data: fromJS(data)
});

const changeHotSongs = data => ({
  type: types.CHANGE_HOT_SONGS,
  data: fromJS(data)
});

export const changeEnterLoading = data => ({
  type: types.CHANGE_ENTER_LOADING,
  data
});

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
