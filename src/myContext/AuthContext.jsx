import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id_user: "",
    nama_admin: "",
    authenticated: false,
  });

  const login = async (username, password, msg) => {
    const response = await fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setUser({
        id_user: json.userId,
        nama_admin: json.namaUser,
        authenticated: json.isLogin,
      });
    } else {
      msg(json.msg);
    }
  };
  const authContextValue = {
    login,
    // logout,
    name: user.nama_admin,
    idUser: user.id_user,
    authenticated: user.authenticated,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
