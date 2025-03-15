import { Outlet } from "react-router-dom";
import AdminSidebar from "./partials/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="admin-layout flex-1 lg:pl-64 min-h-screen bg-slate-200">
          {/* <AdminHeader /> */}
          <div className="custom-scrollbar-admin">
            <Outlet />
          </div>
      </div>
    </div>
  );
};

export default AdminLayout;
