import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

/**
 * Komponen TambahTarif untuk menangani proses penambahan tarif dan menampilkan halaman tambah tarif.
 * @component
 */
const TambahTarif = () => {
  const [daya, setDaya] = useState();
  const [tarifperkwh, setTarifperkwh] = useState();
  const { idUser } = JSON.parse(localStorage.getItem("userLogin"));

  // Hook untuk navigasi
  const navigate = useNavigate();

  /**
   * Menangani proses tambah data tarif ketika formulir dikirimkan.
   * @async
   * @param {Event} e - Event pengiriman formulir.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}tarif`, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": idUser,
      },
      method: "POST",
      body: JSON.stringify({
        daya,
        tarifperkwh,
      }),
    });
    await navigate("/tarif");
  };

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
                onChange={(e) => setDaya(e.target.valueAsNumber)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Tarif per kWh:</label>
              <input
                type="number"
                step="0.01"
                value={tarifperkwh}
                onChange={(e) => setTarifperkwh(e.target.valueAsNumber)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button className="bg-green-700 rounded-md" type="submit">
                Tambah
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

export default TambahTarif;
