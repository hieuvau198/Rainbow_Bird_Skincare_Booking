import React from 'react';

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

const blogData = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x250",
    author: "By Qodex Web - December 04, 2023",
    title: "The Science of Beauty: Ingredients That Transform Your Look",
    description: "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x250",
    author: "By Qodex Web - December 04, 2023",
    title: "Self-Care Sundays: Pamper Yourself with Our Top Picks",
    description: "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x250",
    author: "By Qodex Web - December 04, 2023",
    title: "Behind the Scenes: Crafting Our Exclusive Beauty Products",
    description: "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
];

export default function BlogAndNews() {
  return (
    <div className="px-24 p-6 min-h-screen space-y-12">
      {/* Phần Tin Tức (News) */}
      <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsData.map(news => (
            <div
              key={news.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
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

      {/* Phần Blog */}
      <div className="bg-neutral-50 py-10 px-5 rounded-2xl shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">BLOG POSTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map(blog => (
            <div key={blog.id} className="bg-white shadow-md rounded-2xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-2">{blog.author}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{blog.description}</p>
                <button className="text-sm font-medium text-white bg-gray-800 px-4 py-2 rounded-lg">
                  {blog.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
