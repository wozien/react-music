import axios from 'axios';

export const baseUrl = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: baseUrl
});

// 响应拦截
axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误');
  }
);

export { axiosInstance };
