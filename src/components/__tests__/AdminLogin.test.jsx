// import { MantineProvider } from '@mantine/core';
import { render as renderUi } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navigation from "../../Navigation";

const render = (children) =>
  renderUi(
    // <MantineProvider>
    <Router>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </Router>
    // </MantineProvider>,
  );

describe("Navigation module", () => {
  test("render component correctly", async () => {
    const { getByText, queryByText } = render(
      <Navigation
        paths={[
          {
            label: "Home",
            url: "/url-to-home",
          },
          {
            label: "About",
            url: "/url-to-about",
          },
        ]}
      />
    );

    const label = getByText(/Home/i);
    expect(label).toBeInTheDocument();

    expect(getByText("About")).toBeInTheDocument();

    expect(queryByText("Profile")).not.toBeInTheDocument();
  });
});
