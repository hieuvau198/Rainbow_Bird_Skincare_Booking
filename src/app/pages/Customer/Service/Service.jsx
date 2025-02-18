import { UserOutlined, StarOutlined, DollarOutlined , ClockCircleOutlined, LeftOutlined, RightOutlined  } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import mockData from "./mock_service.json";
import RelatedServices from "./partials/RelatedServices";
import MainContent from "./partials/MainService";
import SidebarService from "./partials/SidebarService";
const url3 ="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function Service() {

  const [services, setServices] = useState ([]);
  useEffect(() => {
    setServices(mockData)
  }, []);

  return (
    <div className="px-24 bg-white min-h-screen grid grid-cols-1 gap-4 w-full">
      {/* Large Banner */}
      <div className="h-[400px] my-2 bg-center bg-cover bg-no-repeat bg-local rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${url3})` }}>
        {/* <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Banner" 
        className="rounded-lg shadow-lg w-full" /> */}
      </div>

      <div className="w-full grid grid-cols-4 gap-4">
        {/* Sidebar */}
        <SidebarService />

        {/* Main Content */}
        <MainContent services={services} />
      </div>

      {/* Related Services Section */}
      {services.length > 0 && <RelatedServices services={services} service={services[0]} />}
    </div>
  );
}
