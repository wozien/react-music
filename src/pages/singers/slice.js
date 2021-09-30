import { createSlice } from '@reduxjs/toolkit'
import { getHotSingerListRequest, getSingerListRequest } from '@/api/request';

const slice = createSlice({
  name: 'singers',
  initialState: {
    singerList: [],
    pageCount: 0,
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false
  },
  reducers: {
    changeSingerList(state, { payload }) {
      state.singerList = payload
    },
    changePageCount(state, { payload }) {
      state.pageCount = payload
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload
    },
    changePullUpLoading(state, { payload }) {
      state.pullUpLoading = payload
    },
    changePullDownLoading(state, { payload }) {
      state.pullDownLoading = payload
    }
  }
})

export const { 
  changeSingerList, changePageCount, changeEnterLoading, changePullUpLoading, changePullDownLoading 
} = slice.actions


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
    const { pageCount, singerList } = getState().singers;
    getHotSingerListRequest(pageCount)
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
    const { pageCount, singerList } = getState().singers;

    getSingerListRequest(category, alpha, pageCount)
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

export default slice.reducer