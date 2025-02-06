import { ClockCircleOutlined, DollarOutlined, LeftOutlined, RightOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mockData from "./mock_serviceDetail.json";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);

  useEffect(() => {
    setServices(mockData);
    const selectedService = mockData.find((s) => s.service_id === id);
    setService(selectedService || null);
  }, [id]);
  
  if (!service) {
    return <div className="text-center text-red-500 mt-6">Dịch vụ không tồn tại!</div>;
  }

  return (
    <div className="px-24 bg-gray-100 min-h-screen mt-2 w-full">
      {/* Nội dung dịch vụ */}
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
          <div className="flex-auto">
            <p className="text-green-600 mt-4 font-semibold text-sm">🎁 Ưu đãi đặc biệt: {service.promotion}</p>
          </div>

          {/* Danh sách hình ảnh nhỏ */}
          {service.extra_images?.length > 0 && (
            <div className="mt-6 flex space-x-4">
              {service.extra_images.map((img, index) => (
                <img key={index} src={img} alt="extra" className="w-20 h-20 rounded-lg shadow-md cursor-pointer hover:opacity-75" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thông tin dịch vụ */}
      <div className="pt-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl mb-5 font-bold text-gray-800">Thông tin dịch vụ</h2>

          {/* Hiển thị nội dung mô tả dịch vụ với định dạng */}
          <div className={`text-gray-700 text-md space-y-3 ${showFullInfo ? "" : "line-clamp-3 overflow-hidden"}`}>
            <ul className="list-disc pl-5 space-y-2">
              {service.additional_info.map((info, index) => {
                if (info.includes(":")) {
                  // Nếu có dấu ":" => hiển thị tiêu đề to hơn
                  const [title, content] = info.split(":");
                  return (
                    <li key={index} className="text-sd list-none">
                      <span className="font-bold text-lg">{title}:</span> {content}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="text-sm ml-4">{info}</li> // Các mục nhỏ hơn & thụt vào
                  );
                }
              })}
            </ul>
          </div>

          {/* Hình ảnh khi mở rộng*/}
          {showFullInfo && (
            <div className="mt-4 flex justify-center">
              <img src={service.image_1} alt="Dịch vụ" className="w-[800px] h-auto rounded-lg shadow-md" />
            </div>
          )}

          {/* Nút xem thêm / thu gọn */}
          <button
          className="mt-4 mx-auto block border border-green-500 text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition-all"
          onClick={() => setShowFullInfo(!showFullInfo)}
          >
          {showFullInfo ? "Thu gọn nội dung" : "Xem thêm nội dung"}
          </button>
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
      sliderRef.current.scrollBy({ left: -1200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 1200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-2 mb-10 shadow-lg p-6 rounded-lg bg-white">
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

