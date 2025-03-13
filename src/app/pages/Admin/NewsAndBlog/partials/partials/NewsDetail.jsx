import {
    ClockCircleOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading";
import getNewsById from "../../../../../modules/NewsAndBlog/getNewsById";

const NewsDetail = ({ newsId }) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!newsId) return;
        setLoading(true);
        getNewsById(newsId)
            .then((data) => {
                setNews(data);
            })
            .catch((error) => {
                console.error("Error fetching news detail:", error);
            })
            .finally(() => setLoading(false));
    }, [newsId]);

    if (loading || !news) return <Loading />;

    return (
        <>
            <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-center items-center">
                    <img
                        src={
                            news.imageUrl ||
                            "https://www.chanchao.com.tw/images/default.jpg"
                        }
                        alt="News"
                        className="w-60 h-60 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-3">
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <IdcardOutlined className="mr-1" /> ID:
                        </span>
                        <span className="ml-4">{news.newsId}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <ProfileOutlined className="mr-1" /> Title:
                        </span>
                        <span className="ml-4">{news.title}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <ClockCircleOutlined className="mr-1" /> Date:
                        </span>
                        <span className="ml-4">
                            {new Date(news.publishedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                            {new Date(news.publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <InfoCircleOutlined className="mr-1" /> Author:
                        </span>
                        <div className="ml-4">{news.publisherFullName}</div>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">Status:</span>
                        <span className="ml-4">
                            <Tag color={news.isPublished ? "green" : "red"}>
                                {news.isPublished ? "Published" : "Unpublished"}
                            </Tag>
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div className="p-4">
                    <MDEditor.Markdown
                        source={news.content || "No content available"}
                        data-color-mode="light" 
                    />
                </div>
            </div>
        </>
    );
};

export default NewsDetail;
