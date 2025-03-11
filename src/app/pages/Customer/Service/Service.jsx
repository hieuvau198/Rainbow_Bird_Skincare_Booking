import React, { useEffect, useState } from "react";
import getAllService from "../../../modules/Admin/Service/getAllService";
import RelatedServices from "./partials/RelatedServices";
import MainContent from "./partials/MainService";
import SidebarService from "./partials/SidebarService";
import Loading from "../../../components/Loading/Loading";

const url3 = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        const formattedServices = data.map(service => ({
          service_id: service.serviceId || "N/A",
          service_name: service.serviceName || "Unknown Service",
          price: service.price ? `${service.price} ${service.currency || "USD"}` : "Price not available",
          description: service.description || "No description available.",
          buyers: service.bookingNumber || "0",
          reviews: service.averageReview || "No reviews",
          image: service.serviceImage || "https://via.placeholder.com/500",
          duration_minutes: service.durationMinutes ? `${service.durationMinutes} minutes` : "Duration not specified"
        }));
        setServices(formattedServices);
        setFilteredServices(formattedServices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const applyPriceFilter = () => {
    let min = parseFloat(minPrice) || 0;
    let max = parseFloat(maxPrice) || Infinity;

    const filtered = services.filter(service => {
      const priceValue = parseFloat(service.price);
      return priceValue >= min && priceValue <= max;
    });

    setFilteredServices(filtered);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-24 bg-white min-h-screen grid grid-cols-1 gap-4 w-full">
      <div
        className="h-[400px] my-2 bg-center bg-cover bg-no-repeat bg-local rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${url3})` }}
      ></div>

      <div className="w-full grid grid-cols-4 gap-4">
        <SidebarService
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          applyPriceFilter={applyPriceFilter}
        />

        <MainContent services={filteredServices} />
      </div>
    </div>
  );
}
