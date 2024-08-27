import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

/**
 * Komponen AdminLogin untuk menangani proses login user dan menampilkan halaman login sebagai user.
 * @component
 */
const AdminLogin = () => {
  /**
   * Untuk mengset data belum login dan mode user dari localStorage agar dapat mendeteksi dia belum login saat aplikasi pertama dirender.
   */
  localStorage.setItem(
    "userLogin",
    JSON.stringify({ isLogin: false, mode: "Admin" })
  );
  const [userLogin, setUserLogin] = useState({
    username: "admin",
    password: "admin",
  });
  const [message, setMessage] = useState("");

  // Hook untuk navigasi
  const navigate = useNavigate();

  /**
   * Menangani proses login ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}admin/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: userLogin.username,
        password: userLogin.password,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      const user = {
        idUser: json.userId,
        namaUser: json.namaUser,
        username: json.username,
        mode: json.mode,
        isLogin: json.isLogin,
      };
      localStorage.setItem("userLogin", JSON.stringify(user));
      await navigate("/");
    } else {
      setMessage(json.msg);
    }
  };

  /**
   * Menangani perubahan input pada formulir login.
   * @param {Event} e - Event perubahan input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center font-PlusJakarta">
      <form
        onSubmit={handleLogin}
        className="w-[520px] bg-white shadow-lg p-10 rounded-lg"
      >
        <div className="text-4xl font-semibold flex flex-col justify-center items-center">
          <div className="text-5xl font-bold flex justify-center">
            <div className="text-yellow-400">KAL</div>
            <div className="text-blue-400">ECTRIC</div>
          </div>
          <div className="mt-3">Admin Login</div>
          <div className="text-sm text-gray-400 text-center my-3">
            Silakan login untuk mengakses akun Anda dan mengelola pembayaran
            listrik dengan mudah dan cepat.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label className="flex flex-col font-semibold">
            Username:
            <input
              type="text"
              name="username"
              value={userLogin.username}
              onChange={handleChange}
              className="rounded-full py-2 px-3 border-2"
              required
            />
          </label>
          <label className="flex flex-col font-semibold">
            Password:
            <input
              type="password"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
              className="border-2 rounded-full py-2 px-3"
              required
            />
          </label>
          <div className="text-sm text-red-600 flex justify-center">
            {message}
          </div>
          <Button className="bg-gray-800 w-full rounded-full" type="submit">
            Login
          </Button>
        </div>
        <div className="text-sm text-center mt-5 underline hover:text-gray-500">
          <Link to={"/login"}>Login sebagai pelanggan</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
