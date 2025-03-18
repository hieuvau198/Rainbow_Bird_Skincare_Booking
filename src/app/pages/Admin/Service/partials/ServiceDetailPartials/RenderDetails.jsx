import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading";
import getServiceDetail from "../../../../../modules/Admin/Service/getServiceDetail";
import getCategoryById from "../../../../../modules/Admin/Service/getCategoryById";
import MDEditor from "@uiw/react-md-editor";
import { Tag } from "antd";
import { ClockCircleOutlined, DollarOutlined, IdcardOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { TbCategory } from "react-icons/tb";

const RenderDetails = ({ serviceId }) => {
  const [service, setService] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serviceId) {
      setLoading(true);
      getServiceDetail(serviceId)
        .then((data) => {
          setService(data);
          if (data.categoryId) {
            getCategoryById(data.categoryId)
              .then((catData) => {
                setCategoryName(catData.categoryName);
              })
              .catch(() => setCategoryName("N/A"));
          }
        })
        .catch((err) => {
          console.error("Error fetching service details:", err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [serviceId]);

  if (loading) return <Loading />;
  if (error) return <div>Error fetching service details.</div>;
  if (!service) return <div>No service details available.</div>;

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex justify-center items-center">
          <img
            src={
              service.serviceImage ||
              `https://ui-avatars.com/api/?name=${service.serviceName}`
            }
            alt="Service"
            className="w-60 h-60 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center space-y-3">
          <div className="flex items-center">
            <span className="font-bold text-xl">{service.serviceName}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-24 flex items-center">
              <IdcardOutlined className="mr-1" /> ID:
            </span>
            <span className="ml-4">{service.serviceId}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-24 flex items-center">
              <DollarOutlined className="mr-1" /> Price:
            </span>
            <span className="ml-4">
              {service.price} {service.currency}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-24 flex items-center">
              <ClockCircleOutlined className="mr-1" /> Duration:
            </span>
            <span className="ml-4">{service.durationMinutes} minutes</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-24 flex items-center">
              <TbCategory className="mr-1" /> Category:
            </span>
            <span className="ml-4">{categoryName || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-24 flex items-center">
              <InfoCircleOutlined className="mr-1" /> Status:
            </span>
            <span className="ml-4">
              <Tag color={service.isActive ? "green" : "volcano"}>
                {service.isActive ? "Available" : "Unavailable"}
              </Tag>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <div className="p-4">
          <MDEditor.Markdown
            source={service.description || "No description available"}
            data-color-mode="light"
          />
        </div>
      </div>
    </>
  );
};

export default RenderDetails;
