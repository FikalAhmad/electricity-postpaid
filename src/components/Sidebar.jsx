import { Link } from "react-router-dom";
import logopln from "../assets/logopln.png";

const Sidebar = () => {
  return (
    <div className="min-w-80 h-[100vh] bg-gray-800 text-white p-7">
      <div className="text-3xl font-medium mb-10">
        <img src={logopln} alt="" className="w-32" />
      </div>
      <div>
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to="/user"
              className="bg-gray-900 text-white flex justify-center py-2 w-full"
            >
              User
            </Link>
          </li>
          <li>
            <Link
              to="/pelanggan"
              className="bg-gray-900  text-white flex justify-center py-2 w-full"
            >
              Pelanggan
            </Link>
          </li>
          <li>
            <Link
              to="/tarif"
              className="bg-gray-900 text-white flex justify-center py-2 w-full"
            >
              Tarif
            </Link>
          </li>
          <li>
            <Link
              to="/tagihan"
              className="bg-gray-900 text-white flex justify-center py-2 w-full"
            >
              Tagihan
            </Link>
          </li>
          <li>
            <Link
              to="/pembayaran"
              className="bg-gray-900 text-white flex justify-center py-2 w-full"
            >
              Pembayaran
            </Link>
          </li>
          <li>
            <Link
              to="/penggunaan"
              className="bg-gray-900 text-white flex justify-center py-2 w-full"
            >
              Penggunaan
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
