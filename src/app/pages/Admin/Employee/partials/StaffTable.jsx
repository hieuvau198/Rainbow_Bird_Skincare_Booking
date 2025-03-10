import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import addStaff from "../../../../modules/Admin/Employee/addStaff";
import getStaff from "../../../../modules/Admin/Employee/getStaff";
import AddStaff from "./StaffPartials/AddStaff";

const StaffTable = () => {
  const [data, setData] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const columns = [
    { title: "Staff ID", dataIndex: "Staffid", key: "Staffid", width: 100 },
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

  const loadStaffData = async () => {
    setLoading(true);
    try {
      const staffUsers = await getStaff();
      // const staffUsers = allUsers.filter(user => user.role === userRole.STAFF);

      const formattedData = staffUsers.map(user => ({
        key: user.staffId,
        Staffid: user.staffId,
        id: user.userId,
        name: user.user.fullName,
        email: user.user.email,
        mobile: user.user.phone,
      }));
      setData(formattedData);
      setFilteredStaff(formattedData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setData([]);
      setFilteredStaff([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  const handleAddStaff = async (values) => {
    try {
      const newStaff = await addStaff(values);
      console.log("Data sent to API:", values);
      setData(prevData => [...prevData, { key: newStaff.fullName, ...newStaff }]);
      setFilteredStaff(prev => [...prev, { key: newStaff.fullName, ...newStaff }]);
      setAddModalVisible(false);
      message.success("Staff added successfully!");
    } catch (error) {
      console.error("Error adding staff:", error);
      message.error("Error adding staff!");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter(staff =>
      staff.name.toLowerCase().includes(value)
    );
    setFilteredStaff(filtered);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Staff List</div>
        <div className="flex items-center">
          <SearchBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
            Add Staff
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredStaff}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 370 }}
      />
      <AddStaff
        open={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddStaff}
      />
    </div>
  );
};

export default StaffTable;