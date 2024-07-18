import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import logokal from "../assets/logokal.png";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: userLogin.username,
        password: userLogin.password,
      }),
    });
    if (response.ok) {
      await navigate("/user");
    }
  };
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
        className="w-96 bg-white shadow-lg p-10 rounded-lg"
      >
        <div className="text-4xl font-semibold flex flex-col justify-center items-center">
          <div className="text-3xl font-medium flex justify-center">
            <img src={logokal} alt="" className="w-32" />
          </div>
          <div>Selamat Datang</div>
          <div className="text-xl text-gray-400">awidnawdioawndi</div>
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
            />
          </label>
          <Button className="bg-gray-800 w-full rounded-full" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
