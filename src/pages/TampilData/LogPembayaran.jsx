import { Suspense, useEffect, useState } from "react";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const LogPelanggan = () => {
  const [pelangganBayar, setpelangganBayar] = useState([]);
  const pelangganData = JSON.parse(localStorage.getItem("userLogin"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
              </tr>
            </thead>
            <tbody className="">
              {pelangganBayar.map((item, index) => {
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

export default LogPelanggan;
