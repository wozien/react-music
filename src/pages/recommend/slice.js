import { createSlice } from '@reduxjs/toolkit'
import { getBannerRequest, getRecommendListRequest } from '@/api/request'

const slice = createSlice({
  name: 'recommend',
  initialState: {
    bannerList: [],
    recommendList: [],
    loading: true
  },
  reducers: {
    changeBanner(state, { payload }) {
      state.bannerList = payload
    },
    changeRecommendList(state, { payload }) {
      state.recommendList = payload
    },
    changeLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

// action creator function
export const { changeBanner, changeRecommendList, changeLoading } = slice.actions

// async action width thunk
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

// selectors
export const selectBannerList = state => state.recommend.bannerList
export const selectRecommendList = state => state.recommend.recommendList
export const selectLoading = state => state.recommend.loading

export default slice.reducer