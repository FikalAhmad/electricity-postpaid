import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../Sidebar";

// Mock data untuk localStorage
const mockUserData = {
  mode: "Pelanggan",
  namaUser: "John Doe",
};

// Mock localStorage
beforeEach(() => {
  jest
    .spyOn(Storage.prototype, "getItem")
    .mockImplementation(() => JSON.stringify(mockUserData));
  jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Sidebar", () => {
  test("renders the sidebar and shows appropriate links based on user mode", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Verifikasi elemen navigasi untuk mode "Pelanggan"
    expect(screen.getByText(/Bayar Tagihan/i)).toBeInTheDocument();
    expect(screen.getByText(/Log Pembayaran/i)).toBeInTheDocument();

    // Elemen navigasi lain yang seharusnya tidak ada dalam mode "Pelanggan"
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data User/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Tarif/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Pelanggan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Penggunaan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Pembayaran/i)).not.toBeInTheDocument();
  });

  test("handles logout correctly", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Temukan tombol logout dan klik
    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    // Verifikasi bahwa localStorage.removeItem dipanggil dengan benar
    expect(localStorage.removeItem).toHaveBeenCalledWith("userLogin");
  });
});
