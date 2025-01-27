import React from "react";

const newsData = [
  {
    id: 1,
    title: "Unlock Your Beauty Potential",
    description: "Elevate your routine with our curated beauty essentials. Limited-time offers on radiant skincare.",
    date: "View Products",
    image: "https://via.placeholder.com/400x250?text=Beauty+1",
  },
  {
    id: 2,
    title: "Exclusive Deals on Luxe Essentials",
    description: "Transform your beauty routine with our premium skincare and cosmetic essentials.",
    date: "Shop Now",
    image: "https://via.placeholder.com/400x250?text=Beauty+2",
  },
];

export default function HomeCenterNews() {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Offers</h2>
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
              <p className="text-gray-600 mt-2">{news.description}</p>
              <button className="mt-4 text-sm font-medium text-blue-600 underline">
                {news.date}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-6">
        <img src="https://via.placeholder.com/80?text=Icon1" alt="Icon1" className="h-12 w-12" />
        <img src="https://via.placeholder.com/80?text=Icon2" alt="Icon2" className="h-12 w-12" />
        <img src="https://via.placeholder.com/80?text=Icon3" alt="Icon3" className="h-12 w-12" />
        <img src="https://via.placeholder.com/80?text=Icon4" alt="Icon4" className="h-12 w-12" />
        <img src="https://via.placeholder.com/80?text=Icon5" alt="Icon5" className="h-12 w-12" />
      </div>
    </div>
  );
}
