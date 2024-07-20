import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon, LeftArrow } from "../../components/Icons.jsx";

/**
 * Komponen TagihanPage untuk menampilkan list tagihan pelanggan.
 * @component
 */
const TagihanPage = () => {
  /**
   * Hook untuk mengambil parameter url.
   * @type {function}
   */
  const { pelangganId } = useParams();
  const [tagihanData, setTagihanData] = useState([]);
  /**
   * Hook untuk navigasi.
   * @type {function}
   */
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Mengambil data tagihan pelanggan by idpelanggan dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/tagihanpelanggan/${pelangganId}`,
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
      setTagihanData(json);
    };

    fetchData();
  }, [pelangganId]);

  /**
   * Menangani proses delete data tagihan by id ketika formulir dikirimkan.
   * @async
   * @param {String} tagihanId - menerima string id penggunaan.
   */
  const handleDelete = async (tagihanId) => {
    await fetch(`http://localhost:3000/tagihan/${tagihanId}`, {
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <Button
        className="bg-gray-400 mt-10 ml-10 flex justify-center items-center gap-2"
        onClick={() => navigate("/penggunaan")}
      >
        <LeftArrow />
        Kembali
      </Button>
      <div className="font-semibold text-3xl pt-8 px-8">Data Tagihan</div>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        <table className="w-full border-collapse text-center">
          <thead className="w-full bg-white">
            <tr className="border-b-2">
              <th>No</th>
              <th>Bulan</th>
              <th>Tahun</th>
              <th>Jumlah Meter</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {tagihanData.map((item, index) => {
              return (
                <tr key={item.id} className="border-b-2">
                  <td className="py-5">{index + 1}</td>
                  <td className="py-5">{item.bulan}</td>
                  <td className="py-5">{item.tahun}</td>
                  <td className="py-5">{item.jumlah_meter}</td>
                  <td className="py-5">
                    {item.status ? (
                      <Button className="bg-green-700">Sudah dibayar</Button>
                    ) : (
                      <Button className="bg-red-600">Belum Dibayar</Button>
                    )}
                  </td>
                  <td>
                    <Button
                      className="bg-red-600 flex gap-2 justify-center items-center"
                      onClick={() => handleDelete(item.id_tagihan)}
                    >
                      <DeleteIcon />
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TagihanPage;
