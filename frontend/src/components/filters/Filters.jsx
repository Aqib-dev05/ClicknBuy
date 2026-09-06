import React, { useEffect, useState } from 'react';
import { getSubCategories } from '../../services/subCategoryService';
import {toast} from "react-toastify"
import { motion as Motion } from 'framer-motion';



function Filters({ searchParams, setSearchParams }) {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data = await getSubCategories();
        if (data) setSubCategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", 1); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  return (
    <Motion.div
      className="flex flex-wrap items-center justify-center gap-4 px-4 py-2 "
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Sort By Filter */}
      <Motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <label className="text-sm font-semibold text-gray-700">Sort By:</label>
        <select
          className="p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          value={searchParams.get("sortBy") || ""}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
        </select>
      </Motion.div>

      {/* Sub Category Filter */}
      <Motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <label className="text-sm font-semibold text-gray-700">Category:</label>
        <select
          className="p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          value={searchParams.get("sub") || ""}
          onChange={(e) => handleFilterChange("sub", e.target.value)}
        >
          <option value="">All Categories</option>
          {subCategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
      </Motion.div>

      {/* Price Range Filter */}
      <Motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <label className="text-sm font-semibold text-gray-700">Price Range:</label>
        <select
          className="p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          value={searchParams.get("priceRange") || ""}
          // onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          onChange={()=>toast.info("Will Be Added in Future!")}
        >
          <option value="">All Prices</option>
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 to $100</option>
          <option value="100-500">$100 to $500</option>
          <option value="500+">Over $500</option>
        </select>
      </Motion.div>

      {/* Clear Filters Button */}
      <Motion.button
        onClick={() => setSearchParams({})}
        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Clear Filters
      </Motion.button>
    </Motion.div>
  );
}

export default Filters;
