import { RankTypes } from './config';

export const getCount = count => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 10000) + '万';
  } else {
    return Math.floor(count / 10000) + '亿';
  }
};

// 防抖
export const debunce = (func, delay) => {
  let timer;
  return function(...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
};

// 处理数据，找出第一个没有歌名的排行榜的数据
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

export const findIdx = name => {
  for (let key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};

// 拼接歌手名字
export const getName = list => {
  let str = '';
  list.map((item, i) => {
    str += i ? '/' + item.name : item.name;
  });
  return str;
};

export const isEmptyObject = obj => {
  // eslint-disable-next-line

  return !obj || Object.keys(obj).length === 0;
};
