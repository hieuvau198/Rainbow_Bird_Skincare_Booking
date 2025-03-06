import React from 'react'
import { Link } from 'react-router-dom'

export default function NewsCard(news) {
    return (
        <div
            key={news.newsId}
            className="bg-white shadow-md rounded-xl overflow-hidden"
        >
            <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-64 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{news.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                    {news.publisherFullName} -{" "}
                    {new Date(news.publishedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    {new Date(news.publishedAt).toLocaleDateString()}
                </p>
                <Link
                    to={`/news/${news.newsId}`}
                    className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg"
                >
                    Read More
                </Link>
            </div>
        </div>
    )
}
