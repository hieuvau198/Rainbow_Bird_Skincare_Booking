import { Outlet } from "react-router-dom";
import "../../styles/ScrollbarAdmin.css";
import AdminHeader from "./partials/AdminHeader";
import AdminSidebar from "./partials/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 lg:pl-64 bg-slate-200">
          <AdminHeader />
          <main className="pt-16 custom-scrollbar">
            <Outlet />
          </main>
      </div>
    </div>
  );
};

export default AdminLayout;
