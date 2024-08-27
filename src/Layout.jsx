import Sidebar from "./components/Sidebar";

/**
 * Komponen Layout untuk menampilkan konten yang akan ditampilkan disamping sidebar.
 *
 * @param {object} props - Properti komponen.
 * @param {React.ReactNode} props.component - Komponen yang akan ditampilkan di dalam layout.
 *
 * @returns {JSX.Element} Komponen layout dengan sidebar dan konten yang diberikan.
 */
const Layout = ({ component }) => {
  return (
    <>
      <div className="flex h-screen bg-[#F2F2F2]  font-PlusJakarta">
        <Sidebar />
        {component}
      </div>
    </>
  );
};

export default Layout;
