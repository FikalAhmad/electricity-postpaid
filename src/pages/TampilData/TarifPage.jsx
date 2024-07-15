import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Tarif</div>
      <Button
        className="bg-gray-400 ml-8 mt-3"
        onClick={() => navigate("/tambahtarif")}
      >
        Tambah Data
      </Button>
      <div className="mt-10 mx-8">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Daya</th>
              <th>Tarif per kWh</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {tarifData.map((item, index) => {
              return (
                <tr key={index + 1} className="border-b-2">
                  <td className="py-5">{index + 1}</td>
                  <td className="py-5">{item.daya}</td>
                  <td className="py-5">{item.tarifperkwh}</td>
                  <td className="flex justify-evenly items-center py-5">
                    <Button
                      className="bg-green-700"
                      onClick={() => navigate(`/edittarif/${item.id_tarif}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-600"
                      onClick={() => handleDelete(item.id_tarif)}
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

export default TarifPage;
