import userAtom from "@/atoms/user.atom";
import { API_URL } from "@/http/fetcher";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export const useAuthAxios = () => {
  const user = useRecoilValue(userAtom);

  const axiosInstance = axios.create({
    baseURL: API_URL + "/api/v1/",
    timeout: 120000,
  });

  // add interceptors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        // redirect to login page
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
      if (
        (error.response.status =
          400 && error.response.data.detail === "user not found")
      ) {
        // redirect to login page
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.request.use(
    async (config) => {
      (config.headers.Accept = "application/json"),
        (config.headers.authorization = `Bearer ${user.token}`);
      config.timeout = 120000;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  useEffect(() => {}, [user]);

  return axiosInstance;
};
