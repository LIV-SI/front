import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.124.96.242/",
  timeout: 10000,
});

instance.interceptors.response.use(
  (res) => {
    console.log("[응답 성공]", res);
    return res;
  },
  (err) => {
    console.error("[응답 에러]", err);
    return Promise.reject(err);
  }
);

export default instance;