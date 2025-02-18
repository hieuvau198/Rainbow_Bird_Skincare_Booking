import React from "react";

const newsData = [
  {
    id: 1,
    title: "Unlock Your Beauty Potential",
    description:
      "Elevate your routine with our curated beauty essentials. Limited-time offers on radiant skincare.",
    date: "View Products",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQGr-5PdbOl-kQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1688971998450?e=2147483647&v=beta&t=jTIxsHUfQVkOMZRhreh54zFO3XER-yY8KeBA-Xcesu4",
  },
  {
    id: 2,
    title: "Exclusive Deals on Luxe Essentials",
    description:
      "Transform your beauty routine with our premium skincare and cosmetic essentials.",
    date: "Shop Now",
    image:
      "https://klemor.in/cdn/shop/files/8D0A7374final...jpg?v=1722260369&width=1946",
  },
];

const blogData = [
  {
    id: 1,
    image:
      "https://bionyxskincare.com/wp-content/uploads/2023/10/ingredients.jpg",
    author: "By Qodex Web - December 04, 2023",
    title: "The Science of Beauty: Ingredients That Transform Your Look",
    description:
      "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
  {
    id: 2,
    image:
      "https://www.anveya.com/cdn/shop/articles/beautiful-woman-doing-self-care-treatment-indoors.jpg?v=1640350354",
    author: "By Qodex Web - December 04, 2023",
    title: "Self-Care Sundays: Pamper Yourself with Our Top Picks",
    description:
      "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/premium-photo/trendy-collage-made-natural-cosmetics-beauty-products-body-face-care_1270664-23029.jpg",
    author: "By Qodex Web - December 04, 2023",
    title: "Behind the Scenes: Crafting Our Exclusive Beauty Products",
    description:
      "Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...",
    buttonText: "Read More",
  },
];

export default function BlogAndNews() {
  return (
    <div className="container mx-auto px-24 p-6 min-h-screen space-y-12">
      {/* News Section */}
      <section className="p-6 bg-gray-50 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          News
        </h2>
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
                <h3 className="text-xl font-bold text-gray-800">
                  {news.title}
                </h3>
                <p className="text-gray-600 mt-2">{news.description}</p>
                <button className="mt-4 text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                  {news.date}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-neutral-50 py-10 px-5 rounded-2xl shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          BLOG POSTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
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
                <p className="text-gray-600 text-sm mb-5">
                  {blog.description}
                </p>
                <button className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                  {blog.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
