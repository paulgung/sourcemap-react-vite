import axios from "axios";

// 创建 Axios 实例
const instance = axios.create();

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据进行处理
    // 提取出响应数据并直接返回
    return response.data.data;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
