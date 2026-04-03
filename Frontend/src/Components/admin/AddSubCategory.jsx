import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSubCategory } from "../../services/subCategoryService";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save } from "lucide-react";

function AddSubCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    parent: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch {
      toast.error("Failed to load categories for selection");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.parent) return toast.error("Please select a parent category");

    setLoading(true);
    try {
      await createSubCategory(formData);
      toast.success("Subcategory created successfully!");
      navigate("/admin/subcategories");
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || "Failed to create subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Add New Subcategory</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
          <select
            required
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3 border outline-none font-serif"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3 border outline-none font-serif"
            placeholder="e.g. Smartphones"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[rgb(219,68,68)] text-white p-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Save Subcategory</span>
        </button>
      </form>
    </div>
  );
}

export default AddSubCategory;
