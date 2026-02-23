import axiosInstance from "./AxiosInstance";

export function getUser() {
  return axiosInstance.get(`/api/users/me`);
}
