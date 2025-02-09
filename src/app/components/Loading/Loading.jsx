import { Flex, Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div>
      <Flex className="flex items-center justify-center min-h-screen">
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 80, color: "#38bdf8" }}
              spin
            />
          }
        />
      </Flex>
    </div>
  );
}
