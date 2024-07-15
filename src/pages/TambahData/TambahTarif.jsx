import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const TambahTarif = () => {
  const [daya, setDaya] = useState();
  const [tarifperkwh, setTarifperkwh] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/tarif", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        daya,
        tarifperkwh,
      }),
    });
    await navigate("/tarif");
  };
  console.log(daya, tarifperkwh);
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">Tambah Tarif</div>
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
                step="0.01"
                value={tarifperkwh}
                onChange={(e) => setTarifperkwh(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button className="bg-green-600" type="submit">
                Tambah
              </Button>
              <Button className="bg-red-600" onClick={() => navigate("/tarif")}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahTarif;
