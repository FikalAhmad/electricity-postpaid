import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: usernameLogin,
        password: passwordLogin,
      }),
    });
    if (response.ok) await navigate("/user");
  };
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="text-4xl font-semibold">Selamat Datang</div>
      <form onSubmit={handleLogin} className="w-96 shadow-lg p-10">
        <div className="flex flex-col gap-5">
          <label className="flex flex-col">
            Username:
            <input
              type="text"
              value={usernameLogin}
              onChange={(e) => setUsernameLogin(e.target.value)}
              className="border-2 rounded-md border-black"
            />
          </label>
          <label className="flex flex-col">
            Password:
            <input
              type="password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              className="border-2 rounded-md border-black"
            />
          </label>
          <Button className="bg-gray-800 w-full" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
