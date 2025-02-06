import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  UserOutlined,
  StarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  LeftOutlined, 
  RightOutlined,
} from "@ant-design/icons";
import mockData from "./mock_serviceDetail.json";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);

  useEffect(() => {
    setServices(mockData);
    const selectedService = mockData.find((s) => s.service_id === id);
    setService(selectedService || null);
  }, [id]);

  if (!service) {
    return <div className="text-center text-red-500 mt-6">Dịch vụ không tồn tại!</div>;
  }

  return (
    <div className="px-12 bg-gray-100 min-h-screen mt-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border shadow-lg p-6 rounded-lg bg-white">
        {/* Hình ảnh dịch vụ */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg">
            <img src={service.image} alt={service.service_name} className="w-full h-full object-cover" />
          </div>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold">
            Đặt hẹn ngay
          </button>
        </div>

        {/* Chi tiết dịch vụ */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{service.service_name}</h1>
          <p className="text-gray-600 text-md mt-2">{service.description}</p>

          <div className="mt-4">
            <p className="text-gray-500 line-through text-lg">
              <DollarOutlined className="mr-2" /> {service.price}
            </p>
            <p className="text-red-500 font-bold text-2xl">
              <DollarOutlined className="mr-2" /> {service.salePrice}
            </p>
            <p className="text-gray-700 text-md mt-2 flex items-center">
              <ClockCircleOutlined className="mr-2" /> {service.duration_minutes} phút
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-md text-gray-700">
            <p className="flex items-center">
              <UserOutlined className="mr-2" /> {service.buyers} người mua
            </p>
            <p className="flex items-center">
              <StarOutlined className="mr-2" /> {service.reviews} đánh giá
            </p>
          </div>

          {/* Danh sách hình ảnh nhỏ */}
          {service.extra_images?.length > 0 && (
            <div className="mt-6 flex space-x-4">
              {service.extra_images.map((img, index) => (
                <img key={index} src={img} alt="extra" className="w-20 h-20 rounded-lg shadow-md cursor-pointer hover:opacity-75" />
              ))}
            </div>
          )}

          {/* Ưu đãi */}
          {service.promotion && (
            <div className="mt-6 border-t pt-4">
              <p className="text-green-600 font-semibold text-lg">Ưu đãi đặc biệt: {service.promotion}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700 text-md">
                {service.additional_info?.map((info, index) => <li key={index}>{info}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Dịch vụ liên quan */}
      <RelatedServices services={services} service={service} />
    </div>
  );
}

function RelatedServices({ services, service }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-8 shadow-lg p-6 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Gợi ý dành riêng cho bạn</h2>
      <div className="relative">
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full">
          <LeftOutlined />
        </button>
        <div ref={sliderRef} className="flex overflow-x-auto no-scrollbar space-x-6 p-2">
          {services
            .filter((s) => s.service_id !== service.service_id)
            .map((related) => (
              <div key={related.service_id} className="min-w-[200px] bg-white shadow-lg rounded-lg p-4 border">
                <img src={related.image} alt={related.service_name} className="w-full h-40 object-cover rounded-md mb-3" />
                <h3 className="text-sm font-semibold line-clamp-2">{related.service_name}</h3>
                <p className="text-red-500 font-bold text-sm flex items-center gap-1">
                  <DollarOutlined /> {related.salePrice}
                  {related.originalPrice && <span className="text-gray-400 line-through text-xs">{related.originalPrice}</span>}
                </p>
                {related.discount && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md">-{related.discount}%</span>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  ⭐ {related.rating} ({related.reviews} đánh giá)
                </div>
                <button className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md text-xs hover:bg-blue-600 transition">
                  Xem chi tiết
                </button>
              </div>
            ))}
        </div>
        <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full">
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
