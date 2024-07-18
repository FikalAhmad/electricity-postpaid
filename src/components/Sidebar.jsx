import { Link } from "react-router-dom";
import {
  DashboardIcon,
  PelangganIcon,
  PembayaranIcon,
  PenggunaanIcon,
  TarifIcon,
  UserIcon,
} from "./Icons";

const Sidebar = () => {
  return (
    <div className="min-w-80 h-[100vh] bg-white text-black p-7">
      <div className="text-4xl font-bold mb-10 flex justify-center">
        {/* <img src={logokal} alt="" className="w-32" /> */}
        <div className="text-yellow-400">KAL</div>
        <div className="text-blue-400">ECTRIC</div>
      </div>
      <div>
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to="/"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <DashboardIcon />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <UserIcon />
              Data User
            </Link>
          </li>
          <li>
            <Link
              to="/tarif"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <TarifIcon />
              Data Tarif
            </Link>
          </li>
          <li>
            <Link
              to="/pelanggan"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <PelangganIcon />
              Data Pelanggan
            </Link>
          </li>
          {/* <li>
            <Link
              to="/tagihan"
              className="text-black flex justify-center py-3 w-full rounded-md hover:bg-[#202024] hover:text-white ease-in duration-100"
            >
              Tagihan
            </Link>
          </li> */}
          <li>
            <Link
              to="/penggunaan"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <PenggunaanIcon />
              Data Penggunaan
            </Link>
          </li>
          <li>
            <Link
              to="/pembayaran"
              className="text-black flex items-center gap-3 py-3 px-3 w-full rounded-md hover:bg-[#ECEDF0] ease-in duration-100"
            >
              <PembayaranIcon />
              Data Pembayaran
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
