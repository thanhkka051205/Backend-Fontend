import UserForm from "../components/layouts/user/user.form";
import UserTable from "../components/layouts/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = (props) => {
  const [dataUsers, setDataUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    try {
      const res = await fetchAllUserAPI(current, pageSize);
      if (res && res.data) {
        setDataUser(res.data.data || res.data.result || []);
        setTotal(res.data.total || res.data.meta?.total || 0);
      }
    } catch (error) {
      console.log("Lỗi khi load user:", error);
    }
  };

  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUsers={dataUsers}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UserPage;
