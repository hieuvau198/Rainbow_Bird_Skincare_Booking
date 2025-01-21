import { Outlet } from "react-router-dom";
import AdminHeader from "./partials/AdminHeader";
import AdminSidebar from "./partials/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <div className="pl-64 bg-slate-200">
        <AdminHeader />
        <div className="mt-[77px] ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;