import axios from "./axios.customize";

const createUserAPI = async (data) => {
  const URL_BACKEND = "/api/v1/users";

  return await axios.post(URL_BACKEND, data);
};

const updateUserAPI = () => {};
const deleteUserAPI = () => {};
const getUserAPI = () => {};

export { createUserAPI, updateUserAPI, deleteUserAPI, getUserAPI };
