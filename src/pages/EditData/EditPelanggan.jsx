import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../components/Icons.jsx";

/**
 * Komponen EditPelanggan untuk menangani proses pengeditan pelanggan dan menampilkan halaman edit pelanggan.
 * @component
 */
const EditPelanggan = () => {
  // Hook untuk mengambil parameter
  const { pelangganId } = useParams();
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
     * Mengambil data pelanggan by id dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}pelanggan/${pelangganId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setUsername(json.username);
      setPassword(json.password);
      setNomorKwh(json.nomor_kwh);
      setNamaPelanggan(json.nama_pelanggan);
      setAlamat(json.alamat);
      setDaya(json.id_tarif);
    };
    /**
     * Mengambil data tarif dari endpoint API.
     *
     * @async
     * @function tarifData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const tarifData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}tarif`, {
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
    tarifData();
  }, [pelangganId]);

  /**
   * Menangani proses update data pelanggan by id ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}pelanggan/${pelangganId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": idUser,
      },
      method: "PATCH",
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
      <div className="font-medium text-3xl pt-10 px-8">Edit Data Pelanggan</div>
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
              <label>Masukkan Nomor Meter:</label>
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
                className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                type="submit"
              >
                <EditIcon />
                Ubah
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

export default EditPelanggan;
