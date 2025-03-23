import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import getPayments from "../../../modules/Payment/getPayment";
import FormatDate from "../../../components/FormatDate";
import VndFormat from "../../../components/VndFormat/VndFormat";
import SearchBar from "../../../components/SearchBar";

export default function StaffPayments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allPayments, setAllPayments] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = allPayments.filter((p) =>
        (p.bookingId && p.bookingId.toString().includes(value)) ||
        (p.sender && p.sender.toLowerCase().includes(value)) ||
        (p.receiver && p.receiver.toLowerCase().includes(value))
      );      
    setData(filtered);
  };  

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const result = await getPayments();
      const formatted = result.map((item, index) => ({
        key: index,
        bookingId: item.bookingId,
        amount: item.totalAmount,
        method: item.paymentMethod,
        status: item.status,
        currency: item.currency,
        tax: item.tax,
        paymentDate: item.paymentDate,
        receiver: item.receiver,
        sender: item.sender,
      }));
      setAllPayments(formatted);
      setData(formatted);
    } catch (err) {
      message.error("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPayments();
  }, []);

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value, record) => <VndFormat amount={value} currency={record.currency} />,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      render: (tax, record) => <VndFormat amount={tax} currency={record.currency} />,
    },
    {
      title: "Method",
      dataIndex: "method",
      render: (text) => <Tag color={text === "VNPAY" ? "blue" : "green"}>{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <Tag color={text === "Paid" ? "green" : "orange"}>{text}</Tag>,
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      render: (date) => <FormatDate date={date} />,
    },
    {
      title: "Sender",
      dataIndex: "sender",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Payments</h2>
          <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
        </div>
  
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>
    </div>
  );
}