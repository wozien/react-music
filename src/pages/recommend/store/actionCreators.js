import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';
import * as types from './constants';

const changeBanner = data => ({
  type: types.CHANGE_BANNER,
  data: fromJS(data)
});

const changeRecommendList = data => ({
  type: types.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

const changeLoading = data => ({
  type: types.CHANGE_LOADING,
  data
});

export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
      .then(res => {
        dispatch(changeBanner(res.banners));
      })
      .catch(() => {
        console.log('获取轮播图数据错误');
      });
  };
};

export const getRecommendList = () => {
  return dispatch => {
    getRecommendListRequest()
      .then(res => {
        dispatch(changeRecommendList(res.result));
        dispatch(changeLoading(false));
      })
      .catch(() => {
        console.log('获取推荐歌单数据错误');
      });
  };
};
