// axios
import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL;

const axiosObject = axios.create({
  baseURL,
  // You can add your headers here
});

export default axiosObject;
