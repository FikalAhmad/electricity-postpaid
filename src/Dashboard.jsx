import Sidebar from "./components/Sidebar";

/* eslint-disable react/prop-types */
const Dashboard = ({ component }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        {component}
      </div>
    </>
  );
};

export default Dashboard;
