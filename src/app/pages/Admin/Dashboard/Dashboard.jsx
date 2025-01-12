import React from "react";
import OverviewMetrics from "./partials/OverviewMetrics";
import RevenueChart from "./partials/RevenueChart";
import TopServices from "./partials/TopServices";
import CustomerRatingChart from "./partials/CustomerRatingChart";
import BestTherapists from "./partials/BestTherapists";
import RevenueByDayChart from "./partials/RevenueByDayChart";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-5 gap-6 mb-6">
        <div className="col-span-3">
          <OverviewMetrics />
        </div>
        <div className="col-span-2">
          <RevenueByDayChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RevenueChart />
        <CustomerRatingChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopServices />
        <BestTherapists />
      </div>
    </div>

  );
}