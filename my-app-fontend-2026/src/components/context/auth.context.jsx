import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  fullName: "",
  email: "",
  role: "",
  avatar: "",
});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    role: "",
    avatar: "",
  });

  const [isLoading, setLoading] = useState(true);
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
