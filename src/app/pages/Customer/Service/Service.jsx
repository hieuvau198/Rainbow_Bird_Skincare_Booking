import React, { useEffect, useState } from "react";
import MainContent from "./partials/MainService";
import SidebarService from "./partials/SidebarService";
import Loading from "../../../components/Loading/Loading";

const url3 = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Service() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all services
        const serviceResponse = await fetch(
          "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Service"
        );
        if (!serviceResponse.ok) throw new Error("Failed to fetch services");
        const servicesData = await serviceResponse.json();

        // Format services
        const formattedServices = servicesData.map((service) => ({
          service_id: service.serviceId || "N/A",
          service_name: service.serviceName || "Unknown Service",
          price: service.price ? `${service.price} ${service.currency || "VND"}` : "Price not available",
          description: service.description || "No description available.",
          buyers: service.bookingNumber || "0",
          reviews: service.averageReview || "No reviews",
          image: service.serviceImage || "https://via.placeholder.com/500",
          duration_minutes: service.durationMinutes ? `${service.durationMinutes} minutes` : "Duration not specified",
          categoryId: service.categoryId || null,
        }));

        setServices(formattedServices);
        setFilteredServices(formattedServices);

        // Fetch categories
        const categoryResponse = await fetch(
          "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/ServiceCategory"
        );
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories");
        const categoryData = await categoryResponse.json();

        setCategories(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Apply filters when selectedCategory or price changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, minPrice, maxPrice]);

  const applyFilters = () => {
    let min = parseFloat(minPrice) || 0;
    let max = parseFloat(maxPrice) || Infinity;
  
    const filtered = services.filter((service) => {
      const priceValue = parseFloat(service.price);
      const priceMatch = priceValue >= min && priceValue <= max;
      const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(service.categoryId);
  
      return priceMatch && categoryMatch;
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

      {/* ✅ Updated Category Selector
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> */}

      <div className="w-full grid grid-cols-4 gap-4">
        <SidebarService
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          applyFilters={applyFilters}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <MainContent services={filteredServices} />
      </div>
    </div>
  );
}
