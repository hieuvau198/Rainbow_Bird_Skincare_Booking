import {
    ClockCircleOutlined,
    DollarOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    ProfileOutlined
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Tag } from "antd";
import Loading from "../../../../../components/Loading";

const renderDetails = (localService) => {
    if (!localService) return <Loading />;

    return (
      <>
        <div className="grid grid-cols-2 gap-4 gap-x-4">
          <div className="flex justify-center items-center">
            <img
              src={localService.serviceImage || "https://www.chanchao.com.tw/images/default.jpg"}
              alt="Service"
              className="w-60 h-60 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <IdcardOutlined className="mr-1" /> ID:
              </span>
              <span className="ml-4">{localService.serviceId}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <ProfileOutlined className="mr-1" /> Name:
              </span>
              <span className="ml-4">{localService.serviceName}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <DollarOutlined className="mr-1" /> Price:
              </span>
              <span className="ml-4">
                {localService.currency}{localService.price}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <ClockCircleOutlined className="mr-1" /> Duration:
              </span>
              <span className="ml-4">{localService.durationMinutes} minutes</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <InfoCircleOutlined className="mr-1" /> Status:
              </span>
              <span className="ml-4">
                <Tag color={localService.isActive ? "green" : "volcano"}>
                  {localService.isActive ? "Available" : "Unavailable"}
                </Tag>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <div className="p-4">
            <MDEditor.Markdown source={localService.description || "No description available"} />
          </div>
        </div>
      </>
    );
  };

export default renderDetails;