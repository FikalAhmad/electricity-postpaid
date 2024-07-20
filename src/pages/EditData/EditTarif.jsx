import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../components/Icons.jsx";

const EditTarif = () => {
  const { tarifId } = useParams();
  const [daya, setDaya] = useState(0);
  const [tarifperkwh, setTarifperkwh] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/tarif/${tarifId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setDaya(json.daya);
      setTarifperkwh(json.tarifperkwh);
    };

    fetchData();
  }, [tarifId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/tarif/${tarifId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        daya,
        tarifperkwh,
      }),
    });
    await navigate("/tarif");
  };
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Edit Data Tarif</div>
      <div className="mt-10 mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <label>Masukkan Daya:</label>
              <input
                type="number"
                value={daya}
                onChange={(e) => setDaya(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Tarif per kWh:</label>
              <input
                type="number"
                value={tarifperkwh}
                onChange={(e) => setTarifperkwh(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button
                className="bg-green-700 flex gap-2 justify-center items-center rounded-md"
                type="submit"
              >
                <EditIcon />
                Ubah
              </Button>
              <Button
                className="bg-red-600 rounded-md"
                onClick={() => navigate("/tarif")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTarif;
