import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../../components/Icons.jsx";

/**
 * Komponen TambahPelanggan untuk menangani proses penambahan pelanggan dan menampilkan halaman tambah pelanggan.
 * @component
 */
const TambahPelanggan = () => {
  const { idUser } = JSON.parse(localStorage.getItem("userLogin"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nomorKwh, setNomorKwh] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [daya, setDaya] = useState(0);

  const [dataDaya, setDataDaya] = useState([]);

  // Hook untuk navigasi
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Mengambil data tarif dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/tarif", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setDataDaya(json);
    };

    fetchData();
  }, []);

  /**
   * Menangani proses tambah data pelanggan ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/pelanggan", {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": idUser,
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        nomor_kwh: nomorKwh,
        nama_pelanggan: namaPelanggan,
        alamat,
        id_tarif: daya,
      }),
    });
    await navigate("/pelanggan");
  };
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">
        Tambah Data Pelanggan
      </div>
      <div className="mt-10 mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <label>Masukkan Nama Pelanggan:</label>
              <input
                type="text"
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
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
              <label>Masukkan Nomor kWh:</label>
              <input
                type="text"
                value={nomorKwh}
                onChange={(e) => setNomorKwh(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Alamat:</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Daya:</label>
              <select
                className="border-2 rounded-md border-black py-2"
                selected
                value={daya}
                onChange={(e) => setDaya(e.target.value)}
              >
                <option>Pilih Daya</option>
                {dataDaya.map((item, index) => {
                  return (
                    <option key={index + 1} value={parseInt(item.id_tarif, 10)}>
                      {item.daya}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button
                className="bg-green-700 flex gap-2 rounded-md justify-center items-center"
                type="submit"
              >
                <PlusIcon />
                Tambah
              </Button>
              <Button
                className="bg-red-600 rounded-md"
                onClick={() => navigate("/pelanggan")}
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

export default TambahPelanggan;
