import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const $http = axios.create({
  baseURL: API_URL,
  timeout: 6000,
});

// add interceptors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // redirect to login page
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// add token before making the request
axios.interceptors.request.use();

export const fetcherWithToken = (url: string, token: string) =>
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default $http;
