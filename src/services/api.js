import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.3.2:7777'
});

export default api;
