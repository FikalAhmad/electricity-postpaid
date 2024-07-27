import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, PlusIcon } from "../../components/Icons.jsx";

/**
 * Komponen PelangganPage untuk menampilkan list pelanggan.
 * @component
 */
const PelangganPage = () => {
  const [pelangganData, setPelangganData] = useState([]);
  const { idUser } = JSON.parse(localStorage.getItem("userLogin"));
  // Hook untuk navigasi
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
      const response = await fetch("http://localhost:3000/pelanggan", {
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
      setPelangganData(json);
    };

    fetchData();
  }, [idUser]);

  /**
   * Menangani proses hapus data pelanggan by idpelanggan ketika formulir dikirimkan.
   * @async
   * @param {String} pelangganId - menerima string id pelanggan.
   */
  const handleDelete = async (pelangganId) => {
    await fetch(`http://localhost:3000/pelanggan/${pelangganId}`, {
      headers: { "X-User-Id": idUser },
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <div className="font-semibold text-3xl pt-8 px-8">Data Pelanggan</div>
      <Button
        className="bg-gray-400 ml-8 mt-3 flex gap-2 justify-center items-center rounded-md"
        onClick={() => navigate("/tambahpelanggan")}
      >
        <PlusIcon />
        Tambah Data
      </Button>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        {pelangganData.length <= 0 ? (
          <div className="flex justify-center text-lg">Belum ada pelanggan</div>
        ) : (
          <table className="w-full border-collapse text-center">
            <thead className="w-full bg-white">
              <tr className="border-b-2">
                <th>No</th>
                <th>Username</th>
                <th>No. Meter</th>
                <th>Nama Admin</th>
                <th>Alamat</th>
                <th>Tarif</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {pelangganData.map((item, index) => {
                return (
                  <tr key={index + 1} className="border-b-2">
                    <td className="py-5">{index + 1}</td>
                    <td className="py-5">{item.username}</td>
                    <td className="py-5">{item.nomor_kwh}</td>
                    <td className="py-5">{item.nama_pelanggan}</td>
                    <td className="py-5">{item.alamat}</td>
                    <td className="py-5">{item.tarif.daya}VA</td>
                    <td className="flex gap-5 justify-center items-center py-5">
                      <Button
                        className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                        onClick={() =>
                          navigate(`/editpelanggan/${item.id_pelanggan}`)
                        }
                      >
                        <EditIcon />
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600 flex gap-2 justify-center items-center rounded-md"
                        onClick={() => handleDelete(item.id_pelanggan)}
                      >
                        <DeleteIcon />
                        Delete
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

export default PelangganPage;
