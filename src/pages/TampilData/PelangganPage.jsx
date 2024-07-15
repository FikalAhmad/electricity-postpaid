import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const PelangganPage = () => {
  const [pelangganData, setPelangganData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/pelanggan", {
        headers: {
          "Content-Type": "application/json",
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
  }, []);

  const handleDelete = async (pelangganId) => {
    await fetch(`http://localhost:3000/pelanggan/${pelangganId}`, {
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Pelanggan</div>
      <Button
        className="bg-gray-400 ml-8 mt-3"
        onClick={() => navigate("/tambahpelanggan")}
      >
        Tambah Data
      </Button>
      <div className="mt-10 mx-8">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Username</th>
              <th>Nomor kWh</th>
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
                  <td className="py-5">{item.tarif.daya} kWh</td>
                  <td className="flex justify-evenly items-center py-5">
                    <Button
                      className="bg-green-700"
                      onClick={() =>
                        navigate(`/editpelanggan/${item.id_pelanggan}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-600"
                      onClick={() => handleDelete(item.id_pelanggan)}
                    >
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

export default PelangganPage;
