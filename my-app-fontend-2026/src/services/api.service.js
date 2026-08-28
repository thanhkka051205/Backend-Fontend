import axios from "./axios.customize";

// 1. API POST: Tạo mới người dùng
const createUserAPI = async (data) => {
  const URL_BACKEND = "/api/v1/users";
  return await axios.post(URL_BACKEND, data);
};

// 2. API PUT: Cập nhật thông tin người dùng
const updateUserAPI = async (data) => {
  const URL_BACKEND = `/api/v1/users`;
  return await axios.put(URL_BACKEND, {
    _id: data.id,
    fullName: data.fullName,
    phone: data.phone,
  });
};

// 3. API DELETE: Xóa người dùng
const deleteUserAPI = async (id) => {
  const URL_BACKEND = `/api/v1/users/${id}`;
  return await axios.delete(URL_BACKEND);
};

// 4. API GET: Lấy toàn bộ danh sách người dùng
const fetchAllUserAPI = async (current, pagSize) => {
  const URL_BACKEND = `/api/v1/users?current=${current}&pageSize=${pagSize}`;
  return await axios.get(URL_BACKEND);
};

// 5. UPLOAD FILE: upload ảnh
const handlerUploadFile = async (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";

  const bodyFormData = new FormData();
  bodyFormData.append("file", file);

  return await axios.post(URL_BACKEND, bodyFormData);
};

// 6. API UPDATE AVATAR
const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_API = "/api/v1/users";
  const data = {
    _id,
    fullName,
    phone,
    avatar,
  };
  return axios.put(URL_API, data);
};

const registerUserAPI = async (data) => {
  const URL_BACKEND = "/api/v1/auth/register";
  return await axios.post(URL_BACKEND, data);
};

const loginAPI = async (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    email: email,
    password: password,
    delay: 2000,
  };
  return await axios.post(URL_BACKEND, data);
};

export {
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  fetchAllUserAPI,
  handlerUploadFile,
  updateUserAvatarAPI,
  registerUserAPI,
  loginAPI,
};
