import axiosInstance from "./AxiosInstance";

export function  getUsers() {
  return axiosInstance.get(`api/admin/users`);
}

export function createUser(userData) {
  return axiosInstance.post(`api/admin/users`, userData);
}

export function updateUser(userId, userData) {
  return axiosInstance.put(`api/users/update/${userId}`, userData);
}

export function deleteUser(userId) {
  return axiosInstance.delete(`api/admin/users/${userId}`);
}
