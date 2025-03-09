import { useRef } from "react";
import { Outlet } from "react-router-dom";
import ScrollTop from "../../components/ScrollTop";
import "../../styles/User/Scrollbar.css";
import Footer from "../Footer";
import Header from "../Header";
import Chatbot from "../../components/ChatBot/ChatBot";

const UserLayout = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div ref={scrollContainerRef} className="custom-scrollbar">
      <Header />
      <main>
        <Chatbot className="z-50"/>
        <Outlet />
        <ScrollTop scrollContainerRef={scrollContainerRef} />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
