import React from "react";

const newsData = [
  {
    id: 1,
    subtitle: "EXCLUSIVE DEALS AWAIT",
    title: "Unlock Your Beauty Potential",
    description:
      "Elevate your routine with our curated beauty essentials. Limited-time offers on radiant skincare.",
    buttonText: "VIEW PRODUCTS",
    image:
      "https://www.shutterstock.com/image-photo/beauty-porter-young-dark-skinned-600nw-1395575063.jpg",
  },
  {
    id: 2,
    subtitle: "TIMELESS BEAUTY OFFER'S",
    title: "Exclusive Deals on Luxe Essentials",
    description:
      "Transform your beauty routine with our premium skincare and cosmetic essentials.",
    buttonText: "SHOP NOW",
    image:
      "https://theshedluxe.com/wp-content/uploads/2023/01/iKOU-Mindful-Wellness.jpg",
  },
];

export default function HomeCenterNews() {
  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          NEWS
        </h2>

        {/* Chia 2 cột (card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsData.map((news) => (
            <div
              key={news.id}
              // group để kích hoạt hover trên toàn thẻ
              className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
            >
              {/* Ảnh nền đặt tuyệt đối, phủ toàn bộ */}
              <img
                src={news.image}
                alt={news.title}
                className="absolute w-full h-full object-left transition-transform duration-500 group-hover:scale-105"
              />

              {/* Nội dung text hiển thị đè lên */}
              <div className="relative z-10 h-full mt-4 flex flex-col justify-center px-6 text-gray-950">
                {/* Subtitle */}
                <p className="text-sm uppercase tracking-widest font-semibold mb-2 opacity-90">
                  {news.subtitle}
                </p>
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                  {news.title}
                </h3>
                {/* Description */}
                <p className="mt-8 text-sm text-gray-800 md:text-base max-w-md opacity-90">
                  {news.description}
                </p>
              </div>

              {/* Button đặt ở dưới cùng */}
              <button
                className="absolute bottom-4 left-6 text-sm font-bold px-4 py-2 text-green-700 rounded-lg transition duration-300 transform hover:scale-105 z-20"
              >
                {news.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
