import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { DeleteIcon } from "../../components/Icons.jsx";

/**
 * Komponen PembayaranPage untuk menampilkan list pembayaran.
 * @component
 */
const PembayaranPage = () => {
  const [pembayaranData, setPembayaranData] = useState([]);

  useEffect(() => {
    /**
     * Mengambil data pembayaran dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/pembayaran", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setPembayaranData(json);
    };

    fetchData();
  }, []);

  /**
   * Menangani proses hapus data tarif by idtarif ketika formulir dikirimkan.
   * @async
   * @param {String} tarifId - menerima string id tarif.
   */
  const handleDelete = async (tarifId) => {
    await fetch(`http://localhost:3000/tarif/${tarifId}`, {
      method: "DELETE",
    });
    await location.reload();
  };
  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <div className="font-semibold text-3xl pt-8 px-8">Data Pembayaran</div>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        <table className="w-full border-collapse text-center">
          <thead className="w-full bg-white">
            <tr className="border-b-2">
              <th>No</th>
              <th>Nomor Meter</th>
              <th>Nama Pelanggan</th>
              <th>Bulan Bayar</th>
              <th>Total Bayar</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pembayaranData
              .filter((pembayaran) => {
                return pembayaran.tagihan.status === false;
              })
              .map((item, index) => {
                return (
                  <tr key={index + 1} className="border-b-2">
                    <td className="py-5">{index + 1}</td>
                    <td className="py-5">{item.pelanggan.nomor_kwh}</td>
                    <td className="py-5">{item.pelanggan.nama_pelanggan}</td>
                    <td className="py-5">{item.tagihan.bulan}</td>
                    <td className="py-5">Rp. {item.total_bayar}</td>
                    <td className="py-5">
                      {item.tagihan.status == false ? (
                        <Button className="bg-red-600 rounded-md">
                          Belum Dibayar
                        </Button>
                      ) : null}
                    </td>
                    <td className="flex gap-5 justify-center items-center py-5">
                      <Button
                        className="bg-red-600 flex gap-2 justify-center items-center rounded-md"
                        onClick={() => handleDelete(item.id_tarif)}
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
      </div>
    </div>
  );
};

export default PembayaranPage;
