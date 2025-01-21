import { Outlet } from "react-router-dom";
import AdminHeader from "./partials/AdminHeader";
import AdminSidebar from "./partials/AdminSidebar";
import Scrollbar from "../../components/Scrollbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1">
        <Scrollbar
          style={{ height: "100vh", overflowY: "auto" }}
          className="lg:pl-64 bg-slate-200"
          trackColor="#e5e7eb"
          thumbColor="#0ea5e9"
          thumbHoverColor="#0ea5e9"
        >
          <AdminHeader />
          <div className="mt-[77px]">
            <Outlet />
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default AdminLayout;
