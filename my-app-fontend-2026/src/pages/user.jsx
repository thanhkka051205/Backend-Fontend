import UserForm from "../components/layouts/user/user.form";
import UserTable from "../components/layouts/user/user.table";
import { getAllUserAPI } from "../services/api.service";
import React, { useEffect, useState } from "react";

const UserPage = (props) => {
  const [dataUsers, setDataUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await getAllUserAPI();
    setDataUser(res.data.data);
  };

  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable dataUsers={dataUsers} loadUser={loadUser} />
    </div>
  );
};

export default UserPage;
