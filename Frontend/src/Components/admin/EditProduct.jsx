import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct, deleteProductImage } from "../../services/productService";
import { getSubCategories } from "../../services/subCategoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save, X, Plus } from "lucide-react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    discountedPrice: "",
    quantity: "",
    SubCategory: ""
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, [id, fetchInitialData]);

  const fetchInitialData = useCallback(async () => {
    setFetching(true);
    try {
      const [productData, subCats] = await Promise.all([
        getProductById(id),
        getSubCategories()
      ]);

      setSubCategories(subCats || []);

      const product = productData?.product || productData; // Handle both wrapper and direct object
      if (product) {
        setFormData({
          name: product.name || "",
          description: product.description || "",
          basePrice: product.basePrice || "",
          discountedPrice: product.discountedPrice || "",
          quantity: product.quantity || product.stock || "",
          SubCategory: product.SubCategory?._id || product.SubCategory || ""
        });
        setExistingImages(product.images || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setFetching(false);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (public_id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteProductImage(id, public_id);
      setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
      toast.success("Image deleted successfully");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("basePrice", formData.basePrice);
      data.append("discountedPrice", formData.discountedPrice);
      data.append("quantity", formData.quantity);
      data.append("Subcategory", formData.SubCategory); // Controller expects Subcategory in body but SubCategory in Model

      newImages.forEach((file) => {
        data.append("images", file);
      });

      await updateProduct(id, data);
      toast.success("Product updated successfully!");
      navigate(-1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[rgb(219,68,68)] h-8 w-8" /></div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Base Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (Rs.)</label>
            <input
              required
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
            />
          </div>
          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (Rs.)</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
            />
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              required
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
            />
          </div>
        </div>

        {/* Subcategory Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
          <select
            name="SubCategory"
            value={formData.SubCategory}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-2.5 border"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImages.map((img) => (
              <div key={img.public_id} className="relative group">
                <img
                  src={img.url}
                  alt="Product"
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExistingImage(img.public_id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {/* New Image Previews */}
            {newImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="New preview"
                  className="w-full h-24 object-cover rounded-lg border border-dashed border-gray-400"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Add Image Button */}
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Plus className="text-gray-400" size={24} />
              <span className="text-xs text-gray-400 font-medium">Add Image</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full bg-[rgb(219,68,68)] text-white p-3.5 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{loading ? "Updating..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
