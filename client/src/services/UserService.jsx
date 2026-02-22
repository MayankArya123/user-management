import axiosInstance from "./AxiosInstance";

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  blocked = false,
}) => {
  console.log("role check", role);

  const response = await axiosInstance.get("/api/admin/users", {
    params: { page, limit, search, role, blocked },
  });

  return response.data;
};

export function createUser(userData) {
  return axiosInstance.post(`api/admin/users`, userData);
}

export function updateUser(userId, userData) {
  return axiosInstance.put(`api/users/update/${userId}`, userData);
}

export function deleteUser(userId) {
  return axiosInstance.delete(`api/admin/users/${userId}`);
}
