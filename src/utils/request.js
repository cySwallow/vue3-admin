import axios from 'axios';
import { encryptBase64, encryptWithAes, generateAesKey } from '@/utils/crypto';
import { encrypt } from '@/utils/jsencrypt';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers['clientid'] = import.meta.env.VITE_APP_CLIENT_ID;
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 2000
});

service.interceptors.request.use(
  function (config) {
    const isEncrypt = (config.headers || {}).isEncrypt === 'true';
    if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey();
      config.headers['encrypt-key'] = encrypt(encryptBase64(aesKey));
      config.data =
        typeof config.data === 'object'
          ? encryptWithAes(JSON.stringify(config.data), aesKey)
          : encryptWithAes(config.data, aesKey);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  function (config) {
    if (config.data.code === 200) {
      return config.data.data;
    } else {
      return Promise.reject(config.data);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default service;
