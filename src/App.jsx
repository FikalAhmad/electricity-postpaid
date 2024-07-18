import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/TampilData/UserPage.jsx";
import PelangganPage from "./pages/TampilData/PelangganPage.jsx";
import TarifPage from "./pages/TampilData/TarifPage.jsx";
import TambahUser from "./pages/TambahData/TambahUser.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EditUser from "./pages/EditData/EditUser.jsx";
import TambahPelanggan from "./pages/TambahData/TambahPelanggan.jsx";
import EditPelanggan from "./pages/EditData/EditPelanggan.jsx";
import TambahTarif from "./pages/TambahData/TambahTarif.jsx";
import EditTarif from "./pages/EditData/EditTarif.jsx";
import PenggunaanPage from "./pages/TampilData/PenggunaanPage.jsx";
import TambahPenggunaan from "./pages/TambahData/TambahPenggunaan.jsx";
import EditPenggunaan from "./pages/EditData/EditPenggunaan.jsx";
import TagihanPage from "./pages/TampilData/TagihanPage.jsx";
import DetailPenggunaan from "./pages/TampilData/DetailPenggunaan.jsx";
import PembayaranPage from "./pages/TampilData/PembayaranPage.jsx";
import Layout from "./Layout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout component={<DashboardPage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<Layout component={<UserPage />} />} />
          <Route
            path="/tambahuser"
            element={<Layout component={<TambahUser />} />}
          />
          <Route
            path="/edituser/:userId"
            element={<Layout component={<EditUser />} />}
          />
          <Route
            path="/pelanggan"
            element={<Layout component={<PelangganPage />} />}
          />
          <Route
            path="/tambahpelanggan"
            element={<Layout component={<TambahPelanggan />} />}
          />
          <Route
            path="/editpelanggan/:pelangganId"
            element={<Layout component={<EditPelanggan />} />}
          />
          <Route path="/tarif" element={<Layout component={<TarifPage />} />} />
          <Route
            path="/tambahtarif"
            element={<Layout component={<TambahTarif />} />}
          />
          <Route
            path="/edittarif/:tarifId"
            element={<Layout component={<EditTarif />} />}
          />
          <Route
            path="/penggunaan"
            element={<Layout component={<PenggunaanPage />} />}
          />
          <Route
            path="/tambahpenggunaan"
            element={<Layout component={<TambahPenggunaan />} />}
          />
          <Route
            path="/editpenggunaan/:penggunaanId"
            element={<Layout component={<EditPenggunaan />} />}
          />
          <Route
            path="/tagihanpelanggan/:pelangganId"
            element={<Layout component={<TagihanPage />} />}
          />
          <Route
            path="/tagihan/:pelangganId"
            element={<Layout component={<TagihanPage />} />}
          />
          <Route
            path="/detailpenggunaan/:pelangganId"
            element={<Layout component={<DetailPenggunaan />} />}
          />
          <Route
            path="/pembayaran"
            element={<Layout component={<PembayaranPage />} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
