import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../components/Icons.jsx";

/**
 * Komponen EditUser untuk menangani proses pengeditan user dan menampilkan halaman edit user.
 * @component
 */
const EditUser = () => {
  /**
   * Hook untuk mengambil parameter url.
   * @type {function}
   */
  const { userId } = useParams();
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);

  /**
   * Hook untuk navigasi.
   * @type {function}
   */
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Mengambil data user by id dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setNama(json.nama_admin);
      setUsername(json.username);
      setPassword(json.password);
      setRole(json.id_level);
    };

    fetchData();
  }, [userId]);

  /**
   * Menangani proses update data user by id ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        nama,
        username,
        password,
        id_level: role,
      }),
    });
    await navigate("/user");
  };
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Edit Data User</div>
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
                value={role}
                onChange={(e) => setRole(parseInt(e.target.value, 10))}
              >
                <option value="">Pilih Role</option>
                <option value="1">Admin</option>
                <option value="2">Petugas</option>
              </select>
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button
                className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                type="submit"
              >
                <EditIcon />
                Ubah
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

export default EditUser;
