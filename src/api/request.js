import { axiosInstance } from './config';

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
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
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
