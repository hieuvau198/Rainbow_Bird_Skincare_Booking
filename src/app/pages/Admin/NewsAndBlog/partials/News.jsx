import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import deleteNews from "../../../../modules/NewsAndBlog/deleteNews";
import editNews from "../../../../modules/NewsAndBlog/editNews";
import getNews from "../../../../modules/NewsAndBlog/getNews";
import AddNews from "./partials/AddNews";
import NewsDetail from "./partials/NewsDetail";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import SearchBar from "../../../../components/SearchBar";

const News = () => {
  const userRole = DecodeRole();
  const [data, setData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [addNewsModalVisible, setAddNewsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

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
      setFilteredNews(formattedData);
    } catch (error) {
      console.error("Error fetching news data:", error);
      message.error("Error fetching news data!");
      setData([]);
      setFilteredNews([]);
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

  const handleChangeStatus = async (record, newStatus) => {
    const payload = {
      title: record.title,
      content: record.content,
      imageUrl: record.imageUrl,
      isPublished: newStatus,
    };
    try {
      await editNews(record.newsId, payload);
      message.success("Status updated successfully!");
      setData((prevData) =>
        prevData.map((item) =>
          item.newsId === record.newsId ? { ...item, isPublished: newStatus } : item
        )
      );
      setFilteredNews((prevData) =>
        prevData.map((item) =>
          item.newsId === record.newsId ? { ...item, isPublished: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status!");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(value)
    );
    setFilteredNews(filtered);
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
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   width: 200,
    //   render: (text) => {
    //     const dateObj = new Date(text);
    //     return `${dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ${dateObj.toLocaleDateString()}`;
    //   },
    // },
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
      width: 150,
      render: (isPublished) => (
        <Tag color={isPublished ? "green" : "red"}>
          {isPublished ? "Published" : "Unpublished"}
        </Tag>
      ),
    },
    {
      title: "Change Status",
      key: "changeStatus",
      width: 150,
      render: (_, record) =>
        (userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) ? (
          <div className="text-center">
            <Switch
              checked={record.isPublished}
              onChange={(checked) => handleChangeStatus(record, checked)}
            />
          </div>
        ) : (<Tag color="red" >You can't change</Tag>),
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
          {/* {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Button color="red" variant="solid" type="link" danger onClick={() => showDeleteConfirm(record)}>
              Delete
            </Button>
          )} */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">News</h2>
        <div className="flex items-center">
          <SearchBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddNewsModalVisible(true)}
            className="bg-blue-500"
          >
            Add News
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredNews}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 350 }}
      />
      <Modal
        open={isDetailModalVisible}
        title={<div className="text-center text-2xl font-bold">News Detail</div>}
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
        width={800}
      >
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
      <AddNews
        open={addNewsModalVisible}
        onClose={() => setAddNewsModalVisible(false)}
        onAdded={loadNewsData}
      />
    </div>
  );
};

export default News;
