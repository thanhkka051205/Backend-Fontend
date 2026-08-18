import axios from "./axios.customize";

const createUserAPI = async (data) => {
  const URL_BACKEND = "/api/v1/users";

  return await axios.post(URL_BACKEND, data);
};

const updateUserAPI = () => {};

const deleteUserAPI = () => {};

const getAllUserAPI = async () => {
  const URL_BACKEND = "/api/v1/users";

  return await axios.get(URL_BACKEND);
};

export { createUserAPI, updateUserAPI, deleteUserAPI, getAllUserAPI };
