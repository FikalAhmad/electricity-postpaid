import Sidebar from "./components/Sidebar";

const Layout = ({ component }) => {
  return (
    <>
      <div className="flex h-screen bg-[#F2F2F2] overflow-hidden font-PlusJakarta">
        <Sidebar />
        {component}
      </div>
    </>
  );
};

export default Layout;
