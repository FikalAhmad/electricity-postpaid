import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

/**
 * Komponen TambahUser untuk menangani proses penambahan user dan menampilkan halaman tambah user.
 * @component
 */
const TambahUser = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);

  /**
   * Hook untuk navigasi.
   * @type {function}
   */
  const navigate = useNavigate();

  /**
   * Menangani proses tambah data user ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        nama,
        username,
        password,
        role,
      }),
    });
    await navigate("/user");
  };
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Tambah User</div>
      <div className="mt-10 mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <label>Masukkan Nama:</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Role:</label>
              <select
                className="border-2 rounded-md border-black py-2"
                selected
                value={role}
                onChange={(e) => setRole(parseInt(e.target.value, 10))}
              >
                <option value="">Pilih Role</option>
                <option value="1">Admin</option>
                <option value="2">Petugas</option>
              </select>
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button className="bg-green-700 rounded-md" type="submit">
                Tambah
              </Button>
              <Button
                className="bg-red-600 rounded-md"
                onClick={() => navigate("/user")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahUser;
