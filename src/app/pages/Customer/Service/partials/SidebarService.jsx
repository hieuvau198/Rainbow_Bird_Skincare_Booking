import React from "react";

export default function Sidebar() {
  return (
    <div className="col-span-1 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Dịch Vụ</h2>
      <ul className="space-y-2 text-sm">
        <li className="p-2 bg-white cursor-pointer">Dịch Vụ Phòng Khám</li>
        <li className="p-2 bg-white cursor-pointer">Triệt Lông Diode Laser</li>
        <li className="p-2 bg-white cursor-pointer">Thư Giãn & Chăm Sóc</li>
      </ul>

      <h2 className="text-lg font-bold mt-4 mb-2">Khoảng Giá</h2>
      <div className="flex items-center space-x-2 text-sm">
        <input type="text" className="w-1/2 p-1 border rounded" placeholder="Từ" />
        <input type="text" className="w-1/2 p-1 border rounded" placeholder="Đến" />
      </div>
      <button className="mt-2 w-full bg-orange-500 text-white p-2 rounded-md text-sm">Áp Dụng</button>

      <hr className="my-4 border-gray-300" />

      <h2 className="text-lg font-bold mt-6 mb-2">Cẩm Nang Mới</h2>
      <div className="space-y-4">
        {[
          {
            img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
            title: "Thông Báo Booking Online",
          },
          {
            img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
            title: "Hướng Dẫn Triệt Lông An Toàn",
          },
          {
            img: "https://media.hcdn.vn/hsk/1737353441_1737348985702-202253631_img_200x145_c4ef78_fit_center.jpg",
            title: "Cách Chăm Sóc Da Sau Dịch Vụ",
          },
        ].map((guide, index) => (
          <div key={index} className="cursor-pointer">
            <img src={guide.img} alt={`Guide ${index + 1}`} className="w-full h-20 rounded" />
            <span className="block mt-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">{guide.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
