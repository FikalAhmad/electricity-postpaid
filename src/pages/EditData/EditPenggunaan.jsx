import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../components/Icons.jsx";

const EditPenggunaan = () => {
  const { penggunaanId } = useParams();
  const [pelanggan, setPelanggan] = useState(0);
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [meterAwal, setMeterAwal] = useState();
  const [meterAkhir, setMeterAkhir] = useState();
  const [dataPelanggan, setDataPelanggan] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/penggunaan/${penggunaanId}`,
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
      setBulan(json.bulan);
      setTahun(json.tahun);
      setMeterAwal(json.meter_awal);
      setMeterAkhir(json.meter_akhir);
      setPelanggan(json.id_pelanggan);
    };
    const pelangganData = async () => {
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
      setDataPelanggan(json);
      setPelanggan(json.id_pelanggan);
    };

    fetchData();
    pelangganData();
  }, [penggunaanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/penggunaan/${penggunaanId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        id_pelanggan: pelanggan,
        bulan,
        tahun,
        meter_awal: meterAwal,
        meter_akhir: meterAkhir,
      }),
    });
    await navigate("/penggunaan");
  };
  return (
    <div className="w-full text-sm overflow-x-hidden">
      <div className="font-medium text-3xl pt-10 px-8">
        Edit Data Penggunaan
      </div>
      <div className="mt-10 mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <label>Masukkan Nama Pelanggan:</label>
              <select
                className="border-2 rounded-md border-black py-2"
                selected
                value={pelanggan}
                onChange={(e) => setPelanggan(parseInt(e.target.value, 10))}
              >
                <option value="">Pilih Pelanggan</option>
                {dataPelanggan.map((item) => {
                  return (
                    <option key={item.id_pelanggan} value={item.id_pelanggan}>
                      {item.nama_pelanggan}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Bulan Penggunaan:</label>
              <input
                type="text"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Tahun Penggunaan:</label>
              <input
                type="text"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Meter Awal:</label>
              <input
                type="number"
                value={meterAwal}
                onChange={(e) => setMeterAwal(e.target.valueAsNumber)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="grid grid-cols-2">
              <label>Masukkan Meter Akhir:</label>
              <input
                type="number"
                value={meterAkhir}
                onChange={(e) => setMeterAkhir(e.target.valueAsNumber)}
                className="border-2 rounded-md border-black py-2"
              />
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <Button
                className="bg-green-700 flex gap-2 justify-center items-center"
                type="submit"
              >
                <EditIcon />
                Ubah
              </Button>
              <Button
                className="bg-red-600"
                onClick={() => navigate("/penggunaan")}
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

export default EditPenggunaan;
