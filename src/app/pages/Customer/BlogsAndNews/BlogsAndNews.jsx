import React from "react";
import News from "./partials/News";
import Blogs from "./partials/Blogs";

export default function BlogAndNews() {
  return (
    <div className="container mx-auto px-24 p-6 min-h-screen space-y-12">
      {/* News Section */}
      <News />

      {/* Blog Posts Section */}
      <Blogs />
    </div>
  );
}
