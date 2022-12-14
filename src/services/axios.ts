import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'https://localhost:4000',
  timeout: 180000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axios;
