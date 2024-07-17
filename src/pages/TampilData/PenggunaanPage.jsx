import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const PenggunaanPage = () => {
  const [penggunaanData, setPenggunaanData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/penggunaan", {
        headers: {
          "Content-Type": "application/json",
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
  }, []);

  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Penggunaan</div>
      <div className="mt-10 mx-8">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Nama Pelanggan</th>
              <th>No. Meter</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {penggunaanData.map((item, index) => {
              return (
                <tr key={index + 1} className="border-b-2">
                  <td className="py-5">{index + 1}</td>
                  <td className="py-5">{item.pelanggan.nama_pelanggan}</td>
                  <td className="py-5">{item.pelanggan.nomor_kwh}</td>
                  <td className="py-5">{item.pelanggan.alamat}</td>
                  <td className="flex justify-evenly items-center py-5">
                    <Button
                      className="bg-gray-400"
                      onClick={() => navigate(`/tambahpenggunaan`)}
                    >
                      Tambah Penggunaan
                    </Button>
                    <Button
                      className="bg-green-700"
                      onClick={() =>
                        navigate(`/detailpenggunaan/${item.id_pelanggan}`)
                      }
                    >
                      Lihat Penggunaan
                    </Button>
                    <Button
                      className="bg-green-700"
                      onClick={() =>
                        navigate(`/tagihanpelanggan/${item.id_pelanggan}`)
                      }
                    >
                      Lihat Penggunaan
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

export default PenggunaanPage;
