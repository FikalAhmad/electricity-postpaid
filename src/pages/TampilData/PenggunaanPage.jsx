import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { PlusIcon, SearchIcon } from "../../components/Icons.jsx";

/**
 * Komponen PenggunaanPage untuk menampilkan list penggunaan dari beberapa pelanggan.
 * @component
 */
const PenggunaanPage = () => {
  const [penggunaanData, setPenggunaanData] = useState([]);
  const { idUser } = JSON.parse(localStorage.getItem("userLogin"));
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Mengambil data pelanggan dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}pelanggan`, {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": idUser,
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setPenggunaanData(json);
    };

    fetchData();
  }, [idUser]);

  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <div className="font-semibold text-3xl pt-8 px-8">Data Penggunaan</div>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        {penggunaanData.length <= 0 ? (
          <div className="flex justify-center text-lg">
            Belum ada penggunaan
          </div>
        ) : (
          <table className="w-full border-collapse text-center">
            <thead className="w-full bg-white">
              <tr className="">
                <th>No</th>
                <th>Nama Pelanggan</th>
                <th>No. Meter</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {penggunaanData.map((item, index) => {
                return (
                  <tr key={index + 1} className="border-b-2">
                    <td className="py-5">{index + 1}</td>
                    <td className="py-5">{item.nama_pelanggan}</td>
                    <td className="py-5">{item.nomor_kwh}</td>
                    <td className="py-5">{item.alamat}</td>
                    <td className="flex gap-3 justify-center items-center py-5">
                      <Button
                        className="bg-gray-400 flex gap-1 justify-center items-center rounded-md"
                        onClick={() =>
                          navigate(`/tambahpenggunaan/${item.id_pelanggan}`)
                        }
                      >
                        <PlusIcon />
                        Tambah Penggunaan
                      </Button>
                      <Button
                        className="bg-green-700 flex gap-1 justify-center items-center rounded-md"
                        onClick={() =>
                          navigate(`/detailpenggunaan/${item.id_pelanggan}`)
                        }
                      >
                        <SearchIcon />
                        Lihat Penggunaan
                      </Button>
                      <Button
                        className="bg-green-700 flex gap-1 justify-center items-center rounded-md"
                        onClick={() =>
                          navigate(`/tagihanpelanggan/${item.id_pelanggan}`)
                        }
                      >
                        <SearchIcon />
                        Lihat Tagihan
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PenggunaanPage;
