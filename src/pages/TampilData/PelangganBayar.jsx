import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

/**
 * Komponen PelangganBayar untuk menampilkan list pembayaran pelanggan untuk membayar tagihan.
 * @component
 */
const PelangganBayar = () => {
  /**
   * pelangganData - untuk mengambil data pelanggan yang login dari localStorage.
   */
  const pelangganData = JSON.parse(localStorage.getItem("userLogin"));
  const [pelangganBayar, setpelangganBayar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Mengambil data pembayaran by id dari endpoint API.
     *
     * @async
     * @function fetchData
     *
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/pembayaran/${pelangganData.idUser}`,
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
      setpelangganBayar(json);
      setLoading(false);
    };

    fetchData();
  }, [pelangganData.idUser]);

  /**
   * Menangani proses update status tagihan by idpelanggan yang bayar ketika formulir dikirimkan.
   * @async
   * @param {String} tagihanId - menerima string id tagihan.
   */
  const handleBayar = async (tagihanId) => {
    await fetch(`http://localhost:3000/tagihan/${tagihanId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        status: true,
      }),
    });
    await location.reload();
  };

  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <div className="font-semibold text-3xl pt-8 px-8">
        Bayar Tagihan Pelanggan
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
          <table className="w-full border-collapse text-center">
            <thead className="w-full bg-white">
              <tr className="border-b-2">
                <th>No</th>
                <th>Bulan</th>
                <th>Jumlah Penggunaan</th>
                <th>Biaya Admin</th>
                <th>No. Meter</th>
                <th>Nama Pelanggan</th>
                <th>Total Bayar</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {pelangganBayar
                .filter((pembayaran) => {
                  return pembayaran.tagihan.status === false;
                })
                .map((item, index) => {
                  return (
                    <tr key={index + 1} className="border-b-2">
                      <td className="py-5">{index + 1}</td>
                      <td className="py-5">{item.bulan_bayar}</td>
                      <td className="py-5">{item.tagihan.jumlah_meter}</td>
                      <td className="py-5">Rp. {item.biaya_admin}</td>
                      <td className="py-5">{item.pelanggan.nomor_kwh}</td>
                      <td className="py-5">{item.pelanggan.nama_pelanggan}</td>
                      <td className="py-5">
                        Rp.
                        {item.total_bayar + item.biaya_admin}
                      </td>
                      <td className="py-5">
                        {item.tagihan.status ? (
                          <Button className="bg-green-700 rounded-md">
                            Sudah dibayar
                          </Button>
                        ) : (
                          <Button className="bg-red-600 rounded-md">
                            Belum Dibayar
                          </Button>
                        )}
                      </td>
                      <td className="flex gap-5 justify-center items-center py-5">
                        <Button
                          className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                          onClick={() => handleBayar(item.id_tagihan)}
                        >
                          Bayar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PelangganBayar;
