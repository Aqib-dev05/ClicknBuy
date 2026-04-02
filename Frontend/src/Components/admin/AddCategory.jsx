import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save } from "lucide-react";

function AddCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory(formData);
      toast.success("Category created successfully!");
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create category");
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
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Add New Category</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3 border outline-none font-serif"
            placeholder="e.g. Electronics"
          />
        </div>



        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[rgb(219,68,68)] text-white p-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Save Category</span>
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
