import { Button, Modal, Space, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import deleteNews from "../../../../modules/NewsAndBlog/deleteNews";
import getNews from "../../../../modules/NewsAndBlog/getNews";
import NewsDetail from "./partials/NewsDetail";

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const loadNewsData = async () => {
    setLoading(true);
    try {
      const newsList = await getNews();
      const formattedData = newsList.map((item) => ({
        key: item.newsId,
        newsId: item.newsId,
        id: item.newsId,
        title: item.title,
        date: item.publishedAt,
        author: item.publisherFullName,
        content: item.content,
        imageUrl: item.imageUrl,
        publishedAt: item.publishedAt,
        isPublished: item.isPublished,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching news data:", error);
      message.error("Error fetching news data!");
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNewsData();
  }, []);

  const viewDetails = (record) => {
    setSelectedNewsId(record.newsId);
    setIsDetailModalVisible(true);
  };

  const showDeleteConfirm = (record) => {
    setNewsToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteNews = async () => {
    if (!newsToDelete) return;
    try {
      await deleteNews(newsToDelete.newsId);
      message.success("News deleted successfully!");
      setData((prev) =>
        prev.filter((news) => news.newsId !== newsToDelete.newsId)
      );
    } catch (error) {
      console.error("Error deleting news:", error);
      message.error("Failed to delete news!");
    } finally {
      setIsDeleteModalVisible(false);
      setNewsToDelete(null);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
      render: (text) => (
        <div className="truncate" style={{ maxWidth: "300px" }} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (text) => {
        const dateObj = new Date(text);
        return `${dateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} ${dateObj.toLocaleDateString()}`;
      },
    },
    {
      title: "Author Name",
      dataIndex: "author",
      key: "author",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "isPublished",
      key: "status",
      width: 100,
      render: (isPublished) => (
        <Tag color={isPublished ? "green" : "red"}>
          {isPublished ? "Published" : "Unpublished"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Button color="primary" variant="solid" type="link" onClick={() => viewDetails(record)}>
            View detail
          </Button>
          <Button color="red" variant="solid" type="link" danger onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">News List</div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 400 }}
      />
      <Modal
        open={isDetailModalVisible}
        title={
          <div className="text-center text-2xl font-bold">News Detail</div>
        }
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
        width={800}
      >
        {/* Chỉ truyền newsId, NewsDetail sẽ tự fetch detail */}
        <NewsDetail newsId={selectedNewsId} />
      </Modal>
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDeleteNews}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this news?</p>
      </Modal>
    </div>
  );
};

export default News;
