import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar";

const DashboardLayout = ({ user, onLogout, children }) => {
  return (
    <div className="flex">
      <Sidebar role={user.role} />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Topbar user={user} onLogout={onLogout} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
