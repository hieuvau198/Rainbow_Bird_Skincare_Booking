import { Outlet } from "react-router-dom";
import AdminHeader from "./partials/AdminHeader";
import AdminSidebar from "./partials/AdminSidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  return (
    <>
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <AdminHeader activeMenu={activeMenu}/>
      <Outlet />
    </>
  );
};

export default AdminLayout;