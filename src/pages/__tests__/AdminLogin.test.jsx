import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import fetchMock from "jest-fetch-mock";
import AdminLogin from "../AdminLogin";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe("AdminLogin Component", () => {
  test("renders the login form", () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    expect(screen.getByText("Admin Login")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password");
  });

  test("handles login submission and success", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        userId: 1,
        namaUser: "Admin",
        username: "admin",
        mode: "Admin",
        isLogin: true,
      }),
      { status: 200 }
    );

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "${import.meta.env.VITE_API_URL}admin/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: "admin",
            password: "password",
          }),
        }
      );
    });

    await waitFor(() => {
      expect(localStorage.getItem("userLogin")).toBeTruthy();
    });
  });

  test("handles login submission and failure", async () => {
    fetch.mockResponseOnce(JSON.stringify({ msg: "Login failed" }), {
      status: 401,
    });

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "${import.meta.env.VITE_API_URL}admin/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: "wronguser",
            password: "wrongpassword",
          }),
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
