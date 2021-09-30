import { axiosInstance, categoryTypes } from './config';

// 获取banner
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

// 获取推荐歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

// 获取热门歌手
export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

// 获取分类的歌手
export const getSingerListRequest = (category, alpha, count) => {
  const query = {
    initial: alpha.toLowerCase(),
    offset:count
  }
  if(category) {
    const {type, area} = categoryTypes.find(item => item.key === category);
    query.type = type;
    query.area = area;
  }
  
  const queryString = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&');
  return axiosInstance.get(`/artist/list?${queryString}`);
};

// 获取排行榜数据
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

// 获取歌单详情
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

// 获取歌手详情
export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};

// 获取歌曲数据
export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get(`/search?keywords=${query}`);
};
