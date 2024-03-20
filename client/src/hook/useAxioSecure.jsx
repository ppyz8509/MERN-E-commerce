import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const axiosAxiosSecure = () => {
  const {logout} = useAuth()
  const navigate = useNavigate()


  // Add a request interceptor
axiosSecure.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("access_token")

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status;
    if (status == 401 || status === 403) {
    }
    return Promise.reject(error);
  });
};
export default useAxiosPublic;
