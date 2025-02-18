import React from "react";

const newsData = [
  {
    id: 1,
    title: "Unlock Your Beauty Potential",
    description: "Elevate your routine with our curated beauty essentials. Limited-time offers on radiant skincare.",
    date: "View Products",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQGr-5PdbOl-kQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1688971998450?e=2147483647&v=beta&t=jTIxsHUfQVkOMZRhreh54zFO3XER-yY8KeBA-Xcesu4",
  },
  {
    id: 2,
    title: "Exclusive Deals on Luxe Essentials",
    description: "Transform your beauty routine with our premium skincare and cosmetic essentials.",
    date: "Shop Now",
    image: "https://klemor.in/cdn/shop/files/8D0A7374final...jpg?v=1722260369&width=1946",
  },
];

export default function HomeCenterNews() {
  return (
    <div className="p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">{news.title}</h3>
              <p className="text-gray-600 mb-3 mt-1">{news.description}</p>
              <button className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
              {news.date}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
