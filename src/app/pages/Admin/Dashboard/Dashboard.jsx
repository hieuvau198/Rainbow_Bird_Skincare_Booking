import React from "react";
import OverviewMetrics from "./partials/OverviewMetrics";
import RevenueChart from "./partials/RevenueChart";
import TopServices from "./partials/TopServices";
import CustomerRatingChart from "./partials/CustomerRatingChart";
import BestTherapists from "./partials/BestTherapists";
import RevenueByDayChart from "./partials/RevenueByDayChart";
import CustomerServiceStatusChart from "./partials/CustomerServiceStatusChart";
import ServiceCategory from "./partials/ServiceCategory";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="lg:col-span-1">
          <OverviewMetrics />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="col-span-5">
          <RevenueByDayChart />
        </div>
        <div className="col-span-5">
          <RevenueChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1">
          <CustomerServiceStatusChart />
        </div>
        <div className="col-span-1">
          <ServiceCategory />
        </div>
        {/* <div className="col-span-1">
          <CustomerRatingChart />
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopServices />
        <BestTherapists />
      </div>
    </div>
  );
}
