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
  list.forEach((item, i) => {
    str += i ? '/' + item.name : item.name;
  });
  return str;
};

export const isEmptyObject = obj => {
  // eslint-disable-next-line
  return !obj || Object.keys(obj).length === 0;
};

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;

let vendor = (() => {
  //首先通过transition属性判断是何种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = time => {
  time = time | 0;
  const minute = (time / 60) | 0;
  const second = (time % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

// 随机算法
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export const shuffle = arr => {
  let newArr = arr.slice();
  for (let i = 0; i < newArr.length; i++) {
    const j = getRandomInt(0, i);
    let t = newArr[j];
    newArr[j] = newArr[i];
    newArr[i] = t;
  }
  return newArr;
};
