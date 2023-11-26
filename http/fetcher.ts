import axios from "axios";
import { env } from "../src/env.mjs";

export const API_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const $http = axios.create({
  baseURL: API_URL + "/api/v1/",
  timeout: 120000,
});

// add interceptors
$http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // redirect to login page
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// const user = JSON.parse(localStorage.getItem("user")!);
// // add token to the request interceptors before making the request
// $http.interceptors.request.use(
//   async (config) => {
//     (config.headers.Accept = "application/json"),
//       (config.headers.authorization = `Bearer ${user.token}`);
//     config.timeout = 120000;
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

export const fetcherWithToken = (url: string, token: string) =>
  $http.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetcher = (url: string) => $http.get(url).then((res) => res.data);
export const localFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

export default $http;
