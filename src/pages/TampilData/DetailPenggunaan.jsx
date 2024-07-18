import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon, EditIcon, LeftArrow } from "../../components/Icons.jsx";

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
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <Button
        className="bg-gray-400 mt-10 ml-10 flex justify-center items-center gap-2"
        onClick={() => navigate("/penggunaan")}
      >
        <LeftArrow />
        Kembali
      </Button>
      <div className="font-semibold text-3xl pt-8 px-8">
        Detail Data Penggunaan
      </div>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        <table className="w-full border-collapse text-center">
          <thead className="w-full bg-white">
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
                  <td className="flex gap-5 justify-center items-center py-5">
                    <Button
                      className="bg-green-700 flex gap-2 justify-center items-center"
                      onClick={() =>
                        navigate(`/editpenggunaan/${item.id_penggunaan}`)
                      }
                    >
                      <EditIcon />
                      Edit
                    </Button>
                    <Button
                      className="bg-red-700 flex gap-2 justify-center items-center"
                      onClick={() => handleDelete(item.id_penggunaan)}
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

export default DetailPenggunaan;
