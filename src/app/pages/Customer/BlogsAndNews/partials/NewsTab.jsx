import React from "react";
import { Pagination, Spin } from "antd";
import NewsCard from "../../../../components/NewsCard";

const NewsTab = ({ newsList, totalNews, newsPage, setNewsPage, pageSize, loading }) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-serif text-gray-800 text-center flex-grow">Latest News</h3>
        {loading && <Spin />}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : newsList.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No news found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {newsList.map((news) => (
              <NewsCard key={news.newsId} {...news} />
            ))}
          </div>
          {totalNews > pageSize && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={newsPage}
                pageSize={pageSize}
                total={totalNews}
                onChange={setNewsPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsTab;