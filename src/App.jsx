import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/TampilData/UserPage.jsx";
import PelangganPage from "./pages/TampilData/PelangganPage.jsx";
import TarifPage from "./pages/TampilData/TarifPage.jsx";
import TambahUser from "./pages/TambahData/TambahUser.jsx";
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
import AdminLogin from "./pages/AdminLogin.jsx";
import PelangganLogin from "./pages/PelangganLogin.jsx";
import PelangganBayar from "./pages/TampilData/PelangganBayar.jsx";
import LogPelanggan from "./pages/TampilData/LogPembayaran.jsx";
import PrivateRoute from "./middleware/PrivateRoute.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<DashboardPage />} />}
              />
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<PelangganLogin />} />
          <Route
            path="/user"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<UserPage />} />}
              />
            }
          />
          <Route
            path="/tambahuser"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TambahUser />} />}
              />
            }
          />
          <Route
            path="/edituser/:userId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<EditUser />} />}
              />
            }
          />
          <Route
            path="/pelanggan"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<PelangganPage />} />}
              />
            }
          />
          <Route
            path="/tambahpelanggan"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TambahPelanggan />} />}
              />
            }
          />
          <Route
            path="/editpelanggan/:pelangganId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<EditPelanggan />} />}
              />
            }
          />
          <Route
            path="/tarif"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TarifPage />} />}
              />
            }
          />

          <Route
            path="/tambahtarif"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TambahTarif />} />}
              />
            }
          />
          <Route
            path="/edittarif/:tarifId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<EditTarif />} />}
              />
            }
          />
          <Route
            path="/penggunaan"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<PenggunaanPage />} />}
              />
            }
          />
          <Route
            path="/tambahpenggunaan/:pelangganId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TambahPenggunaan />} />}
              />
            }
          />
          <Route
            path="/editpenggunaan/:penggunaanId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<EditPenggunaan />} />}
              />
            }
          />
          <Route
            path="/tagihanpelanggan/:pelangganId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TagihanPage />} />}
              />
            }
          />
          <Route
            path="/tagihan/:pelangganId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<TagihanPage />} />}
              />
            }
          />
          <Route
            path="/detailpenggunaan/:pelangganId"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<DetailPenggunaan />} />}
              />
            }
          />
          <Route
            path="/pembayaran"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<PembayaranPage />} />}
              />
            }
          />
          <Route
            path="/pelanggan/bayar"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<PelangganBayar />} />}
              />
            }
          />
          <Route
            path="/pelanggan/log"
            element={
              <PrivateRoute
                privateRoute={<Layout component={<LogPelanggan />} />}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
