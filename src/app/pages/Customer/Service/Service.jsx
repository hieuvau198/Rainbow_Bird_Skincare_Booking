import { UserOutlined, StarOutlined, DollarOutlined , ClockCircleOutlined, LeftOutlined, RightOutlined  } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import mockData from "./mock_service.json";
import { Link } from "react-router-dom";
const url3 ="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function Service() {

  const [services, setServices] = useState ([]);
  useEffect(() => {
    setServices(mockData)
  })

  return (
    <div className="px-24 bg-grey-10 min-h-screen mt-2 grid grid-cols-1 gap-4 w-full">
      {/* Large Banner */}
      <div className="h-[400px] my-2 bg-center bg-cover bg-no-repeat bg-local rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${url3})` }}>
        {/* <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Banner" 
        className="rounded-lg shadow-lg w-full" /> */}
      </div>

      <div className="w-full grid grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Dịch Vụ</h2>
          <ul className="space-y-2 text-sm">
            <li className="p-2 bg-white cursor-pointer"> {" "} Dịch Vụ Phòng Khám {" "} </li>
            <li className="p-2 bg-white cursor-pointer"> {" "}  Triệt Lông Diode Laser{" "} </li>
            <li className="p-2 bg-white cursor-pointer"> {" "} Thư Giãn & Chăm Sóc{" "} </li>
          </ul>

          <h2 className="text-lg font-bold mt-4 mb-2">Khoảng Giá</h2>
          <div className="flex items-center space-x-2 text-sm">
            <input type="text" className="w-1/2 p-1 border rounded" placeholder="Từ" />
            <input type="text" className="w-1/2 p-1 border rounded" placeholder="Đến" />
          </div>
          <button className="mt-2 w-full bg-orange-500 text-white p-2 rounded-md text-sm"> {" "} Áp Dụng{" "} </button>

          {/* Phân cách */}
          <hr className="my-4 border-gray-300" />

          {/* Cẩm Nang */}
          <h2 className="text-lg font-bold mt-6 mb-2">Cẩm Nang Mới</h2>
          <div className="space-y-4">
            {[
              { img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg", title: "Thông Báo Booking Online", },
              { img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg", title: "Hướng Dẫn Triệt Lông An Toàn", },
              { img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg", title: "Cách Chăm Sóc Da Sau Dịch Vụ", },
            ].map((guide, index) => (
              <div key={index} className="cursor-pointer">
                <img src={guide.img} alt={`Guide ${index + 1}`} className="w-full h-20 rounded" />
                <span className="block mt-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">
                  {guide.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 p-4">
          {/* Sorting and Display Options */}
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <div className="flex space-x-2 text-sm">
              <button className="bg-gray-50">Sắp Xếp</button>
              <select className="p-2 bg-gray-150 rounded-md">
                <option>Giá cao đến thấp</option>
                <option>Giá thấp đến cao</option>
                <option>Bán chạy</option>
              </select>
            </div>
            <span className="text-gray-600">{services.length} Dịch vụ</span>
          </div>

          {/* Service List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.service_id}  className="bg-white shadow-lg rounded-lg p-4 border">
                <Link to={`/services/${service.service_id}`} key={service.service_id} target="_top" className="block">
                  <div className="bg-white cursor-pointer">
                    {/* Title */}
                    <p className="text-gray-500 text-xs">Thẩm mỹ không xâm lấn</p>
                    <h3 className="text-sm font-semibold">{service.service_name}</h3>

                    {/* Image */}
                    <div className="relative">
                      <img src={service.image} alt={service.service_name} className="w-full rounded-md my-2 transform transition-transform duration-300 hover:scale-105" />
                    </div>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between text-gray-600 text-xs mt-1">
                      <p><UserOutlined className="fas fa-users"></UserOutlined > {service.buyers} người mua</p>
                      <p><StarOutlined className="fas fa-star"></StarOutlined> {service.reviews} đánh giá</p>
                    </div>

                    <div className="mt-2">
                      <p className="text-gray-500 line-through text-xs"><DollarOutlined />{service.price}</p>
                      <p className="text-red-500 font-bold text-sm"><DollarOutlined />{service.salePrice}</p>
                      <p className="text-gray-700 text-xs"><ClockCircleOutlined />{service.duration_minutes}</p>
                    </div>
                  </div>
                </Link>
                {/* Phân cách */}
                <hr className="my-4 border-gray-300" />

                {/* Description */}
                <p className="text-gray-600 text-xs mt-2 min-h-12"> {service.description}
                  <Link to={`/services/${service.service_id}`} key={service.service_id} target="_top" className="text-blue-500"> Xem thêm </Link>
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-orange-500 text-white text-xs p-2 rounded-md"> Đặt hẹn </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thêm danh sách dịch vụ liên quan */}
      {services.length > 0 && <RelatedServices services={services} service={services[0]} />}
    </div>
  );

  function RelatedServices({ services, service }) {
    const sliderRef = useRef(null);
  
    const scrollLeft = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: -1200, behavior: "smooth" });
      }
    };
  
    const scrollRight = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 1200, behavior: "smooth" });
      }
    };
  
    return (
      <div className="mt-10 mb-10 shadow-lg p-6 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Gợi ý dành riêng cho bạn</h2>
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
          >
            <LeftOutlined />
          </button>
          <div
            ref={sliderRef}
            className="flex overflow-hidden divide-x divide-gray-300 p-2 flex-nowrap"
          >
            {services
              .filter((s) => s.service_id !== service.service_id)
              .map((related) => (
                <div key={related.service_id} className="min-w-[240px] bg-white p-4 border-0 flex flex-col h-full">
                  <img
                    src={related.image}
                    alt={related.service_name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {related.service_name}
                  </h3>
                  <p className="text-red-500 font-bold text-sm flex items-center gap-1">
                    <DollarOutlined /> {related.salePrice}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    ⭐ {related.rating} ({related.reviews} đánh giá)
                  </div>
                  <button className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md text-xs hover:bg-blue-600 transition">
                    Xem chi tiết
                  </button>
                </div>
              ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    );
  }
}
