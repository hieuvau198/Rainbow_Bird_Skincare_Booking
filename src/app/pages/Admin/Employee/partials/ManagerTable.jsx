
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import addManager from "../../../../modules/Admin/Employee/addManager";
import getManager from "../../../../modules/Admin/Employee/getManager";
import AddManager from "./ManagerPartials/AddManager";

const ManagerTable = () => {
  const [data, setData] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const columns = [
    // { title: "Manager ID", dataIndex: "managerId", key: "managerId", width: 150 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Action",
      key: "action",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <Button color="gold" variant="solid" type="link">View details</Button>
      //     <Button color="danger" variant="solid" type="link" danger>
      //       Delete
      //     </Button>
      //   </Space>
      // ),
    },
  ];

  const loadManagerData = async () => {
    setLoading(true);
    try {

      const managerUsers = await getManager();

      const formattedData = managerUsers.map((user) => ({
        key: user.managerId,
        managerId: user.managerId,
        id: user.userId,
        name: user.user.fullName,
        email: user.user.email,
        mobile: user.user.phone,
      }));
      setData(formattedData);
      setFilteredManagers(formattedData);
    } catch (error) {
      console.error("Error fetching manager data:", error);
      setData([]);
      setFilteredManagers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadManagerData();
  }, []);

  const handleAddManager = async (values) => {
    try {
      const newManager = await addManager(values);
      setData((prevData) => [
        ...prevData,
        { key: newManager.username, ...newManager },
      ]);
      setFilteredManagers((prevData) => [
        ...prevData,
        { key: newManager.username, ...newManager },
      ]);
      setAddModalVisible(false);
      loadManagerData();
      message.success("Manager added successfully!");
    } catch (error) {
      console.error("Error adding Manager:", error);
      message.error("Error adding Manager!");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((manager) =>
      manager.name.toLowerCase().includes(value)
    );
    setFilteredManagers(filtered);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Manager List</div>
        <div className="flex items-center">
          <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
            Add Manager
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredManagers}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 370 }}
      />
      <AddManager
        open={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddManager}
      />
    </div>
  );
};

export default ManagerTable;