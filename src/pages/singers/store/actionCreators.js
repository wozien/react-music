import { fromJS } from 'immutable';
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';
import * as types from './constants';

const changeSingerList = data => ({
  type: types.CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = data => ({
  type: types.CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = data => ({
  type: types.CHANGE_ENTER_LOADING,
  data
});

export const changePullUpLoading = data => ({
  type: types.CHANGE_PULLUP_LOADING,
  data
});

export const changePullDownLoading = data => ({
  type: types.CHANGE_PULLDOWM_LOADING,
  data
});

// 第一次获取热门歌手
export const getHotSingerList = () => {
  return dispatch => {
    getHotSingerListRequest(0)
      .then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      })
      .catch(() => {
        console.log('获取热门歌手失败');
      });
  };
};

// 第一次获取分类歌手
export const getSingerList = (category, alpha) => {
  return dispatch => {
    getSingerListRequest(category, alpha, 0)
      .then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      })
      .catch(() => {
        console.log('获取分类歌手失败');
      });
  };
};

export const getMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const count = getState().getIn(['singers', 'pageCount']);
    const singerList = getState()
      .getIn(['singers', 'singerList'])
      .toJS();
    getHotSingerListRequest(count)
      .then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
      })
      .catch(() => {
        console.log('获取热门歌手失败');
      });
  };
};

export const getMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const count = getState().getIn(['singers', 'pageCount']);
    const singerList = getState()
      .getIn(['singers', 'singerList'])
      .toJS();
    getSingerListRequest(category, alpha, count)
      .then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
      })
      .catch(() => {
        console.log('获取热门歌手失败');
      });
  };
};
