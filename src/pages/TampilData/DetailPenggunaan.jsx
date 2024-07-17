import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";

const DetailPenggunaan = () => {
  const { pelangganId } = useParams();
  const [penggunaanData, setPenggunaanData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/detailpenggunaan/${pelangganId}`,
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
      setPenggunaanData(json);
    };

    fetchData();
  }, [pelangganId]);

  const handleDelete = async (penggunaanId) => {
    await fetch(`http://localhost:3000/penggunaan/${penggunaanId}`, {
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Detail Penggunaan</div>
      <div className="mt-10 mx-8">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Bulan</th>
              <th>Tahun</th>
              <th>Meter Awal</th>
              <th>Meter Akhir</th>
              <th>Total Penggunaan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {penggunaanData.map((item, index) => {
              return (
                <tr key={index + 1} className="border-b-2">
                  <td className="py-5">{index + 1}</td>
                  <td className="py-5">{item.bulan}</td>
                  <td className="py-5">{item.tahun}</td>
                  <td className="py-5">{item.meter_awal}</td>
                  <td className="py-5">{item.meter_akhir}</td>
                  <td className="py-5">{item.tagihan.jumlah_meter} kWh</td>
                  <td className="flex justify-evenly items-center py-5">
                    <Button
                      className="bg-green-700"
                      onClick={() =>
                        navigate(`/editpenggunaan/${item.id_penggunaan}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-700"
                      onClick={() => handleDelete(item.id_penggunaan)}
                    >
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

export default DetailPenggunaan;
