import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = 'http://localhost:3000';
const tokencookie = Cookies.get('authorization')

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${tokencookie}`,
        Accept: 'application/json'
  },
    withCredentials: true
});