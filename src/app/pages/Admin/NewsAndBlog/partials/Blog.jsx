import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import deleteBlog from "../../../../modules/NewsAndBlog/deleteBlog";
import getBlog from "../../../../modules/NewsAndBlog/getBlog";
import AddBlog from "./partials/AddBlog";
import BlogDetail from "./partials/BlogDetail";

const Blog = () => {
  const [data, setData] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [addBlogModalVisible, setAddBlogModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

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
      setFilteredBlogs(formattedData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      message.error("Error fetching blog data!");
      setData([]);
      setFilteredBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogData();
  }, []);

  const viewDetails = (record) => {
    setSelectedBlogId(record.blogId);
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
      setFilteredBlogs((prev) =>
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

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((blog) =>
      blog.title.toLowerCase().includes(value)
    );
    setFilteredBlogs(filtered);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Blog</h2>
        <div className="flex items-center">
          <SearchBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            placeholder="Search blog title..."
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddBlogModalVisible(true)}
            className="bg-blue-500"
          >
            Add Blog
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredBlogs}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 400 }}
      />
      <Modal
        open={isDetailModalVisible}
        title={<div className="text-center text-2xl font-bold">Blog Detail</div>}
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
        width={800}
      >
        <BlogDetail blogId={selectedBlogId} />
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
      <AddBlog
        open={addBlogModalVisible}
        onClose={() => setAddBlogModalVisible(false)}
        onAdded={loadBlogData}
      />
    </div>
  );
};

export default Blog;
