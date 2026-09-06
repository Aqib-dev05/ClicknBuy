import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, updateCategory } from "../../services/categoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save } from "lucide-react";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setFetching(true);
        const data = await getCategories();
        const currentCategory = data.find(cat => cat._id === id);
        if (currentCategory) {
          setFormData({
            name: currentCategory.name || ""
          });
        } else {
          toast.error("Category not found");
          navigate("/admin/categories");
        }
      } catch {
        toast.error("Failed to load category details");
      } finally {
        setFetching(false);
      }
    };
    fetchCategoryDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCategory(id, formData);
      toast.success("Category updated successfully!");
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[rgb(219,68,68)] h-8 w-8" /></div>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Edit Category</h2>
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
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3 border outline-none font-serif"
          />
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[rgb(219,68,68)] text-white p-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Update Category</span>
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
