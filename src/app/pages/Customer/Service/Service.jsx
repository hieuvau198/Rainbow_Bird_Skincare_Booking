import { UserOutlined, StarOutlined, DollarOutlined , ClockCircleOutlined  } from "@ant-design/icons";
import React from "react";

const services = [
  {
    service_id: 1,
    service_name: "Triệt Lông Nách (1 Buổi)",
    price: "2.188.000đ",
    salePrice: "1.500.000đ",
    description: "Triệt Lông Diode Laser An Toàn & Hiệu Quả - Không Phát Sinh Chí Phí!",
    buyers: "20.000",
    reviews: "4",
    image:"https://media.hcdn.vn/catalog/product/a/v/avt-nach-1726122729_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 7 phút",
    
  },
  {
    service_id: 2,
    service_name: "Triệt Lông Vùng Bikini (1 Buổi)",
    price: "1.050.000đ",
    salePrice: "500.000đ",
    description: "Lấy Nhân Mụn Chuẩn Y Khoa Bác sĩ Da Liễu tư vấn chăm sóc da miễn phí! Loại bỏ nhân mụn bằng tăm bông an toàn",
    buyers: "40.000",
    reviews: "19",
    image: "https://media.hcdn.vn/catalog/product/v/i/vien-bikini-1726193516_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 60 phút",
  },
  {
    service_id: 3,
    service_name: "Ủ Trắng Vùng Nách",
    price: "1.130.000đ",
    salePrice: "200.000đ",
    description: "Triệt Lông Diode Laser An Toàn & Hiệu Quả - Không Phát Sinh Chí Phí!",
    buyers: "50.000",
    reviews: "9",
    image: "https://media.hcdn.vn/catalog/product/u/-/u-nach-avt-1670045353_1_-1734405773_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 30 phút",
  },
  {
    service_id: 4,
    service_name: "Triệt Lông Nách (1 Buổi)",
    price: "2.188.000đ",
    salePrice: "1.500.000đ",
    description: "Triệt Lông Diode Laser An Toàn & Hiệu Quả - Không Phát Sinh Chí Phí!",
    buyers: "20.000",
    reviews: "4",
    image:"https://media.hcdn.vn/catalog/product/a/v/avt-nach-1726122729_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 7 phút",
    
  },
  {
    service_id: 5,
    service_name: "Triệt Lông Vùng Bikini (1 Buổi)",
    price: "1.050.000đ",
    salePrice: "500.000đ",
    description: "Lấy Nhân Mụn Chuẩn Y Khoa Bác sĩ Da Liễu tư vấn chăm sóc da miễn phí! Loại bỏ nhân mụn bằng tăm bông an toàn",
    buyers: "40.000",
    reviews: "19",
    image: "https://media.hcdn.vn/catalog/product/v/i/vien-bikini-1726193516_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 60 phút",
  },
  {
    service_id: 6,
    service_name: "Ủ Trắng Vùng Nách",
    price: "1.130.000đ",
    salePrice: "200.000đ",
    description: "Triệt Lông Diode Laser An Toàn & Hiệu Quả - Không Phát Sinh Chí Phí!",
    buyers: "50.000",
    reviews: "9",
    image: "https://media.hcdn.vn/catalog/product/u/-/u-nach-avt-1670045353_1_-1734405773_img_380x380_64adc6_fit_center.jpg",
    duration_minutes: "1 lần | 30 phút",
  },
];

export default function Service() {
  return (
    <div className="px-40 bg-white min-h-screen mt-2 grid grid-cols-1 gap-4 w-full">
      {/* Large Banner */}
      <div className="w-full">
        <img src="https://media.hcdn.vn/catalog/category/1320x250-1.jpg" alt="Banner" className="rounded-lg shadow-lg" />
      </div>

      <div className="w-full grid grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
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

                {/* Phân cách */}
                <hr className="my-4 border-gray-300" />

                {/* Description */}
                <p className="text-gray-600 text-xs mt-2 min-h-12"> {service.description}
                  <a href="#" className="text-blue-500"> Xem thêm </a>
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
    </div>
  );
}
