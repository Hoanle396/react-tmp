import * as axios from "axios";
var axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:3000/api',
});
axiosInstance.interceptors.request.use(
   config => {
     if (!config.headers.Authorization) {
      const token = localStorage.getItem('token')
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
     }
     return config;
   },
   error => Promise.reject(error)
 );

export default axiosInstance;