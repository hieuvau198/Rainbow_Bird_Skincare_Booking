import React from 'react';

export default function HomeRecentBlogs() {
    return (
        <div className=" py-10 px-5">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">BLOG POSTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Blog Post 1 */}
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src="https://bionyxskincare.com/wp-content/uploads/2023/10/ingredients.jpg" // Replace with actual image URL
                        alt="The Science of Beauty"
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <p className="text-gray-500 text-sm mb-2">By Qodex Web - December 04, 2023</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            The Science of Beauty: Ingredients That Transform Your Look
                        </h3>
                        <p className="text-gray-600 text-sm mb-5">
                            Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...
                        </p>
                        <button className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                            Read More
                        </button>
                    </div>
                </div>

                {/* Blog Post 2 */}
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src="https://www.anveya.com/cdn/shop/articles/beautiful-woman-doing-self-care-treatment-indoors.jpg?v=1640350354" // Replace with actual image URL
                        alt="Self-Care Sundays"
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <p className="text-gray-500 text-sm mb-2">By Qodex Web - December 04, 2023</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Self-Care Sundays: Pamper Yourself with Our Top Picks
                        </h3>
                        <p className="text-gray-600 text-sm mb-5">
                            Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...
                        </p>
                        <button className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                            Read More
                        </button>
                    </div>
                </div>

                {/* Blog Post 3 */}
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src="https://img.freepik.com/premium-photo/trendy-collage-made-natural-cosmetics-beauty-products-body-face-care_1270664-23029.jpg" // Replace with actual image URL
                        alt="Behind the Scenes"
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <p className="text-gray-500 text-sm mb-2">By Qodex Web - December 04, 2023</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Behind the Scenes: Crafting Our Exclusive Beauty Products
                        </h3>
                        <p className="text-gray-600 text-sm mb-5">
                            Any, meaning - it doesn't matter what color or print it is. It'll work. Augue...
                        </p>
                        <button className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
