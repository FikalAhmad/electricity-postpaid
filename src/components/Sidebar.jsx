import { NavLink, useNavigate } from "react-router-dom";
import {
  DashboardIcon,
  HistoryIcon,
  PelangganIcon,
  PembayaranIcon,
  PenggunaanIcon,
  TarifIcon,
  UserIcon,
} from "./Icons";

/**
 * Sidebar component - Komponen sidebar untuk navigasi seluruh fitur yang ada didalam aplikasi.
 * @returns {JSX.Element} Komponen sidebar.
 */
const Sidebar = () => {
  /**
   * storedUserData - untuk mengambil data dari localStorage user yang login
   */
  const storedUserData = JSON.parse(localStorage.getItem("userLogin"));

  // Hook untuk navigasi
  const navigate = useNavigate();

  /**
   * Menangani logout akun dan menavigasikan ke halaman login masing-masing mode.
   * @param {string} mode - Menerima string ("Pelanggan", "Admin", "Petugas").
   */
  const handleLogout = (mode) => {
    localStorage.removeItem("userLogin");
    mode == "Pelanggan" ? navigate("/login") : navigate("/admin/login");
  };

  return (
    <div className="min-w-80 h-screen bg-white text-black p-7 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-between">
        <div className="text-4xl font-bold mb-10 flex justify-center">
          <div className="text-yellow-400">KAL</div>
          <div className="text-blue-400">ECTRIC</div>
        </div>
        <ul className="flex flex-col gap-5 w-full">
          {storedUserData.mode == "Pelanggan" ? (
            <>
              <li>
                <NavLink
                  to="/pelanggan/bayar"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <PembayaranIcon />
                  Bayar Tagihan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pelanggan/log"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <HistoryIcon />
                  Log Pembayaran
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <UserIcon />
                  Data User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tarif"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <TarifIcon />
                  Data Tarif
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pelanggan"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <PelangganIcon />
                  Data Pelanggan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/penggunaan"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <PenggunaanIcon />
                  Data Penggunaan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pembayaran"
                  className={({ isActive }) =>
                    `text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100 ${
                      isActive ? "bg-[#ECEDF0]" : ""
                    }`
                  }
                >
                  <PembayaranIcon />
                  Data Pembayaran
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="px-4 py-2 rounded-md shadow-md bg-[#ECEDF0] flex flex-col justify-center items-center">
          Selamat Datang
          <div className="font-bold">{storedUserData.namaUser}</div>
        </div>
        <button
          className="px-4 py-2 rounded-md shadow-md bg-[#ECEDF0] flex justify-center"
          onClick={() => handleLogout(storedUserData.mode)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
