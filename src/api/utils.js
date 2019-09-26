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
