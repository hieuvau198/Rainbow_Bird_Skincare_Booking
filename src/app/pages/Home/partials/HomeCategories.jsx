import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllService from "../../../modules/Admin/Service/getAllService";
import { FaGift, FaLeaf, FaGlobe } from "react-icons/fa";
import Loading from "../../../components/Loading";

export default function SkincareCategories() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        setServices(data.slice(0, 12));
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    

    fetchServices();
  }, []);

  if (loading) {
    return <><Loading /></>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 flex flex-col">
      {/* Main Content */}
      
      
      
      {/* Top bar with icons */}
      <div className="w-full bg-[rgb(191,238,174)] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <FaGift className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">Gifts For You</p>
          </div>
          <div className="flex flex-col items-center">
            <FaLeaf className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">100% Organic</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGlobe className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">Online Acquisition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
