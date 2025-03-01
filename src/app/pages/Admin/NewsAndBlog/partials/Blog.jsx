import { Table, message, Button, Space, Modal } from "antd";
import React, { useEffect, useState } from "react";
import BlogDetail from "./partials/BlogDetail"; // Đường dẫn đến file BlogDetail.jsx
import getBlog from "../../../../modules/NewsAndBlog/getBlog";
import deleteBlog from "../../../../modules/NewsAndBlog/deleteBlog";

const Blog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const loadBlogData = async () => {
    setLoading(true);
    try {
      const blogsList = await getBlog();
      const formattedData = blogsList.map((item) => ({
        key: item.blogId,
        blogId: item.blogId,
        id: item.blogId,
        title: item.title,
        date: item.createdAt,
        author: item.authorFullName,
        content: item.content,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      message.error("Error fetching blog data!");
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogData();
  }, []);

  const viewDetails = (record) => {
    setSelectedBlog(record);
    setIsDetailModalVisible(true);
  };

  const showDeleteConfirm = (record) => {
    setBlogToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      await deleteBlog(blogToDelete.blogId);
      message.success("Blog deleted successfully!");
      setData((prev) =>
        prev.filter((blog) => blog.blogId !== blogToDelete.blogId)
      );
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog!");
    } finally {
      setIsDeleteModalVisible(false);
      setBlogToDelete(null);
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
    { title: "Author Name", dataIndex: "author", key: "author", width: 150 },
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
        <div className="text-xl font-medium">Blog List</div>
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
          <div className="text-center text-2xl font-bold">
            Blog Detail
          </div>
        }
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
        width={800}
      >
        <BlogDetail blog={selectedBlog} />
      </Modal>
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDeleteBlog}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </div>
  );
};

export default Blog;
