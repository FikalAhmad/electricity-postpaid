import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, PlusIcon } from "../../components/Icons.jsx";

const TarifPage = () => {
  const [tarifData, setTarifData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/tarif", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setTarifData(json);
    };

    fetchData();
  }, []);

  const handleDelete = async (tarifId) => {
    await fetch(`http://localhost:3000/tarif/${tarifId}`, {
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <div className="text-sm bg-white m-5 rounded-md w-full relative overflow-hidden">
      <div className="font-semibold text-3xl pt-8 px-8">Data Tarif</div>
      <Button
        className="bg-gray-400 ml-8 mt-3 flex gap-2 justify-center items-center rounded-md"
        onClick={() => navigate("/tambahtarif")}
      >
        <PlusIcon />
        Tambah Data
      </Button>
      <div className="m-10 h-[550px] overflow-x-hidden overflow-y-auto">
        <table className="w-full border-collapse text-center">
          <thead className="w-full bg-white">
            <tr className="border-b-2">
              <th>No</th>
              <th>Daya</th>
              <th>Tarif/kWh</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tarifData.map((item, index) => {
              return (
                <tr key={index + 1} className="border-b-2">
                  <td className="py-5">{index + 1}</td>
                  <td className="py-5">{item.daya}VA</td>
                  <td className="py-5">Rp. {item.tarifperkwh}</td>
                  <td className="flex gap-5 justify-center items-center py-5">
                    <Button
                      className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                      onClick={() => navigate(`/edittarif/${item.id_tarif}`)}
                    >
                      <EditIcon />
                      Edit
                    </Button>
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

export default TarifPage;
