import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { getSubCategories } from "../../services/subCategoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save, X, UploadCloud, Plus } from "lucide-react";

/* Expected request body {name,
    description,
    basePrice,
    discountedPrice,
    quantity,
    SubCategory,}  and req.files {images}
    */

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    discountedPrice: "",
    quantity: "",
    SubCategory: ""
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetchSubCategories();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSubCategories = async () => {
    try {
      const data = await getSubCategories();
      setSubcategories(data);
    } catch {
      toast.error("Failed to fetch subcategories");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => fd.append(key, formData[key]));
      selectedImages.forEach((image) => fd.append("images", image));

      await createProduct(fd);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
        const errorMsg = err?.response?.data?.message || "Failed to create product";
        if (viewportWidth <= 1024) {
            setErrorMessage(errorMsg);
        } else {
            toast.error(errorMsg);
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-2xl rounded-2xl my-8">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Product</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in the details to list a new product in your store.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: General Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Product Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Ex: Wireless Noise Cancelling Headphones"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Description</label>
              <textarea
                required
                name="description"
                rows={5}
                placeholder="Give a detailed description of the product..."
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Base Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    required
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    className="block w-full pl-8 rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Discounted Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className="block w-full pl-8 rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Quantity</label>
                    <input
                        required
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">SubCategory</label>
                    <select
                        required
                        name="SubCategory"
                        value={formData.SubCategory}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:bg-white focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3.5 border transition-all"
                    >
                        <option value="">Select SubCategory</option>
                        {subcategories.map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>

          {/* Right Column: Image Uploads */}
          <div className="space-y-6">
            <label className="block text-sm font-semibold text-gray-800 mb-1.5 uppercase tracking-wider">Product Images</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl hover:border-[rgb(219,68,68)] transition-colors group cursor-pointer relative">
              <div className="space-y-2 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[rgb(219,68,68)] transition-colors" />
                <div className="flex text-sm text-gray-600">
                  <span className="relative cursor-pointer rounded-md font-semibold text-[rgb(219,68,68)] hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                    Upload images
                    <input 
                      type="file" 
                      multiple 
                      className="sr-only" 
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
              <input 
                type="file" 
                multiple 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {/* Image Preview Grid */}
            {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {imagePreviews.map((url, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                            <img src={url} alt={`preview-${index}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <label className="flex items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[rgb(219,68,68)] hover:bg-red-50 transition-all cursor-pointer">
                        <Plus className="text-gray-400 group-hover:text-[rgb(219,68,68)]" size={24} />
                        <input type="file" multiple className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
            )}
          </div>
        </div>

        {/* Error Message for Mobile/Tablet */}
        {errorMessage && viewportWidth <= 1024 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <X className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700 font-medium">
                            {errorMessage}
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full lg:w-max ml-auto bg-[rgb(219,68,68)] text-white px-10 py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-xl active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={22} /> : <Save size={22} />}
            <span>{loading ? "Creating Product..." : "Create Product"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
