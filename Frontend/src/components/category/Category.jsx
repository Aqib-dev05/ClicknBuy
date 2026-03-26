import React, { useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { getSubCategoryByCategory } from "../../services/subCategoryService";
import {
  setCategories,
  setSubCategories,
  setError,
  setLoading,
} from "../../Redux/Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { HashLoader } from "react-spinners";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subCategories, categories, loading } = useSelector(
    (state) => state.products,
  );
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getCategories();
        dispatch(setCategories(response));
        if (response && response.length > 0) {
          setSelectedCategory(response[0]);
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCategory();
  }, [dispatch]);

  async function fetchSubCategory(categoryId) {
    try {
      const res = await getSubCategoryByCategory(categoryId);
      if (res) {
        dispatch(setSubCategories(res));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  }

  function handleTabClick(cat) {
    setSelectedCategory(cat);
    fetchSubCategory(cat._id);
  }

  async function  productsView(sub) {
       navigate(`/products?sub=${sub}`);
  }

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <HashLoader color="#dc2626" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        {/* Sidebar - Categories */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-50 border-r border-gray-100">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-2">
            <LayoutGrid size={20} className="text-red-600" />
            <h2 className="font-bold text-gray-800">Categories</h2>
          </div>
          <ul className="py-2">
            {categories &&
              categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => handleTabClick(category)}
                  className={`px-6 py-4 cursor-pointer flex justify-between items-center transition-all duration-200 ${
                    selectedCategory?._id === category._id
                      ? "bg-red-50 text-red-600 border-l-4 border-red-600 font-semibold"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.name}
                  <ChevronRight
                    size={16}
                    className={
                      selectedCategory?._id === category._id
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  />
                </li>
              ))}
          </ul>
        </div>

        {/* Main Content - Subcategories */}
        <div className="flex-1 p-8">
          {selectedCategory ? (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory.name}
                </h3>
                <p className="text-gray-500">
                  Explore sub-categories in {selectedCategory.name}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subCategories && subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <div
                      onClick={()=>productsView(sub._id)}
                      key={sub._id}
                      className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {sub.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2">
                        View Products
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400 italic">
                    No sub-categories found for {selectedCategory.name}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <LayoutGrid size={48} className="mb-4 opacity-20" />
              <p>Select a category to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
