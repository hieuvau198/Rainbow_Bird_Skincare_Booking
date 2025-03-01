import { Button } from "antd";
import React, { useState } from "react";
import Blog from "./partials/Blog";
import News from "./partials/News";

export default function NewsAndBlog() {
    const [activeCategory, setActiveCategory] = useState("news");

    const renderComponent = () => {
        switch (activeCategory) {
            case "news":
                return <News />;
            case "blog":
                return <Blog />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 max-w-[1270px]">
            <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">News and Blog</h2>
                    <div className="flex space-x-4">
                        <Button
                            type={activeCategory === "news" ? "primary" : "default"}
                            onClick={() => setActiveCategory("news")}
                        >
                            News
                        </Button>
                        <Button
                            type={activeCategory === "blog" ? "primary" : "default"}
                            onClick={() => setActiveCategory("blog")}
                        >
                            Blog
                        </Button>
                    </div>
                </div>
                {renderComponent()}
            </div>
        </div>
    );
}
