import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'http://localhost:4000/api/v1/posts',
  timeout: 180000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axios;
