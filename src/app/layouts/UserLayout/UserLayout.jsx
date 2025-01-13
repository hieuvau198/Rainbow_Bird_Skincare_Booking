import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ScrollTop from "../../components/ScrollTop/ScrollTop";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollTop />
      <Footer />
    </>
  );
};

export default UserLayout;