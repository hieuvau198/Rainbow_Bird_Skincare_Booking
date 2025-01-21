import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ScrollTop from "../../components/ScrollTop";
import Scrollbar from "../../components/Scrollbar";

const UserLayout = () => {
  return (
    <Scrollbar
      style={{ height: "100vh", overflowY: "auto" }}
      className="bg-white"
      trackColor="#f5f5f5"
      thumbColor="#84cc16"
      thumbHoverColor="#0369a1"
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollTop />
      <Footer />
    </Scrollbar>
  );
};

export default UserLayout;