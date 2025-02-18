import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, StarOutlined, DollarOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function MainContent({ services }) {
  return (
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
          <div key={service.service_id} className="bg-white shadow-lg rounded-lg p-4 border">
            <Link to={`/services/${service.service_id}`} key={service.service_id} target="_top" className="block">
              <div className="bg-white cursor-pointer">
                {/* Title */}
                <p className="text-gray-500 text-xs">Thẩm mỹ không xâm lấn</p>
                <h3 className="text-sm font-semibold">{service.service_name}</h3>

                {/* Image */}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full rounded-md my-2 transform transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Price & Status */}
                <div className="flex items-center justify-between text-gray-600 text-xs mt-1">
                  <p><UserOutlined /> {service.buyers} người mua</p>
                  <p><StarOutlined /> {service.reviews} đánh giá</p>
                </div>

                <div className="mt-2">
                  <p className="text-gray-500 line-through text-xs"><DollarOutlined /> {service.price}</p>
                  <p className="text-red-500 font-bold text-sm"><DollarOutlined /> {service.salePrice}</p>
                  <p className="text-gray-700 text-xs"><ClockCircleOutlined /> {service.duration_minutes}</p>
                </div>
              </div>
            </Link>
            {/* Phân cách */}
            <hr className="my-4 border-gray-300" />

            {/* Description */}
            <p className="text-gray-600 text-xs mt-2 min-h-12">
              {service.description}
              <Link to={`/services/${service.service_id}`} target="_top" className="text-blue-500"> Xem thêm </Link>
            </p>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-orange-500 text-white text-xs p-2 rounded-md"> Đặt hẹn </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
