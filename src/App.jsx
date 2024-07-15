import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user"
            element={<Dashboard component={<UserPage />} />}
          />
          <Route
            path="/tambahuser"
            element={<Dashboard component={<TambahUser />} />}
          />
          <Route
            path="/edituser/:userId"
            element={<Dashboard component={<EditUser />} />}
          />
          <Route
            path="/pelanggan"
            element={<Dashboard component={<PelangganPage />} />}
          />
          <Route
            path="/tambahpelanggan"
            element={<Dashboard component={<TambahPelanggan />} />}
          />
          <Route
            path="/editpelanggan/:pelangganId"
            element={<Dashboard component={<EditPelanggan />} />}
          />
          <Route
            path="/tarif"
            element={<Dashboard component={<TarifPage />} />}
          />
          <Route
            path="/tambahtarif"
            element={<Dashboard component={<TambahTarif />} />}
          />
          <Route
            path="/edittarif/:tarifId"
            element={<Dashboard component={<EditTarif />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
