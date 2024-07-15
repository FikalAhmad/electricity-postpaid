import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";

const TagihanPage = () => {
  const [tagihanData, setTagihanData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/tagihan", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setTagihanData(json);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Tagihan</div>
      <Button className="bg-gray-400 ml-8 mt-3">Tambah Data</Button>
      <div className="mt-10 mx-8">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Nama Pelanggan</th>
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
                  <td className="py-5">{item.pelanggan.nama_pelanggan}</td>
                  <td className="py-5">{item.bulan}</td>
                  <td className="py-5">{item.tahun}</td>
                  <td className="py-5">{item.jumlah_meter}</td>
                  <td className="py-5">{item.status} kWh</td>
                  <td className="flex justify-evenly items-center py-5">
                    <Button className="bg-green-700">Edit</Button>
                    <Button className="bg-red-600">Delete</Button>
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
