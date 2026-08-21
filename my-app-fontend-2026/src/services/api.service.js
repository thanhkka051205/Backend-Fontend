import axios from "./axios.customize";

// 1. API POST: Tạo mới người dùng
const createUserAPI = async (data) => {
  const URL_BACKEND = "/api/v1/users";
  return await axios.post(URL_BACKEND, data);
};

// 2. API PUT: Cập nhật thông tin người dùng
const updateUserAPI = async (data) => {
  const URL_BACKEND = `/api/v1/users`;
  return await axios.put(URL_BACKEND, data);
};

// 3. API DELETE: Xóa người dùng
const deleteUserAPI = async (data) => {
  const URL_BACKEND = `/api/v1/users/${data.idUsers}`;
  return await axios.delete(URL_BACKEND);
};

// 4. API GET: Lấy toàn bộ danh sách người dùng
const getAllUserAPI = async () => {
  const URL_BACKEND = "/api/v1/users";
  return await axios.get(URL_BACKEND);
};

export { createUserAPI, updateUserAPI, deleteUserAPI, getAllUserAPI };
