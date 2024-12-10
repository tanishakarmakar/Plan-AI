import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'  //http://localhost:5000 for local backend deployment
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found");
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;
