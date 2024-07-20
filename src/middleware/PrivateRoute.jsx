import { Navigate } from "react-router-dom";

/**
 * Private Route - Komponen middleware untuk mengecek apakah user sudah login atau belum dan juga untuk mengecek role itu user atau pelanggan.
 *
 * @param {React.ReactNode} props.privateRoute - Komponen yang routenya ingin dibatasi penggunanya sebelum login.
 *
 * @returns {JSX.Element} Jika sudah login maka akan diperbolehkan akses komponen routenya. jika belum, maka akan diarahkan ke menu login.
 */
const PrivateRoute = ({ privateRoute }) => {
  const info = JSON.parse(localStorage.getItem("userLogin")) || {
    isLogin: false,
    mode: "Pelanggan",
  };

  const { isLogin, mode } = info;

  if (isLogin) {
    return privateRoute;
  } else {
    return <Navigate to={mode === "Pelanggan" ? "/login" : "/admin/login"} />;
  }
};

export default PrivateRoute;
