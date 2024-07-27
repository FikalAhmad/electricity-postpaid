import { useEffect, useState } from "react";
import {
  PelangganIcon,
  PembayaranIcon,
  PenggunaanIcon,
  TagihanIcon,
} from "../components/Icons";

/**
 * Komponen DashboardPage untuk menampilkan halaman dashboard pada tampilan user yang berisi informasi mengenai jumlah pelanggan, pembayaran, tagihan dan penggunaan.
 * @component
 */
const DashboardPage = () => {
  const [totalData, setTotalData] = useState([]);
  const { idUser } = JSON.parse(localStorage.getItem("userLogin"));
  useEffect(() => {
    /**
     * Mengambil data total data dari endpoint API.
     * @async
     * @function fetchData
     * @throws {Error} Jika status respons tidak OK.
     */
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/totaldata", {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": idUser,
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setTotalData(json);
    };

    fetchData();
  }, [idUser]);
  return (
    <div className="grid grid-cols-2 w-full gap-5 place-items-center m-5 rounded-md">
      <div className="flex flex-col gap-3 p-10 rounded-lg w-full h-full bg-white">
        <div className="text-3xl flex items-center gap-3">
          <PelangganIcon /> Total Pelanggan
        </div>
        <div className="text-4xl font-semibold">{totalData.totalPelanggan}</div>
      </div>
      <div className="flex flex-col gap-3 p-10 rounded-lg w-full h-full bg-white">
        <div className="text-3xl flex items-center gap-3">
          <PenggunaanIcon /> Total Penggunaan
        </div>
        <div className="text-4xl font-semibold">
          {totalData.totalPenggunaan}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-10 rounded-lg w-full h-full bg-white">
        <div className="text-3xl flex items-center gap-3">
          <TagihanIcon /> Total Tagihan
        </div>
        <div className="text-4xl font-semibold">{totalData.totalTagihan}</div>
      </div>
      <div className="flex flex-col gap-3 p-10 rounded-lg w-full h-full bg-white">
        <div className="text-3xl flex items-center gap-3">
          <PembayaranIcon /> Total Pembayaran
        </div>
        <div className="text-4xl font-semibold">
          {totalData.totalPembayaran}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
