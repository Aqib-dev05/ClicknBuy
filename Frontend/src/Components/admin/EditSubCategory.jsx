import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubCategoryByID, updateSubCategory } from "../../services/subCategoryService";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Save } from "lucide-react";

function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [currentParent, setCurrentParent] = useState("N/A");

  const [formData, setFormData] = useState({
    name: "",
    parent: ""
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setFetching(true);
        const [subCatData, catData] = await Promise.all([
          getSubCategoryByID(id),
          getCategories()
        ]);

        setSubCategory(subCatData);
        setCategories(catData || []);
        setCurrentParent(subCatData?.parent || "N/A");
        console.log(currentParent)
        console.log(subCatData.parent)

        if (subCatData) {
          setFormData({
            name: subCatData.name,
            parent: subCatData.parent?._id || subCatData.parent || ""
          });
        } else {
          toast.error("Subcategory not found");
          navigate("/admin/subcategories");
        }
      } catch {
        toast.error("Failed to load subcategory details");
      } finally {
        setFetching(false);
      }
    };
    fetchInitialData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSubCategory(id, formData);
      toast.success("Subcategory updated successfully!");
      navigate("/admin/subcategories");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update subcategory");
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
        <h2 className="text-2xl font-bold text-gray-800 font-serif">
          Edit Subcategory {subCategory && `: ${subCategory.name}`}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[rgb(219,68,68)] focus:ring-[rgb(219,68,68)] p-3 border outline-none font-serif"
            placeholder="Subcategory Name"
          />
        </div>

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
              <option
                key={cat._id}
                value={cat._id}
                style={cat._id === currentParent._id ? { backgroundColor: "#fecaca", fontWeight: "bold" } : {}}
              >
                {cat.name} {cat._id === currentParent._id ? "(Current)" : ""}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[rgb(219,68,68)] text-white p-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Update Subcategory</span>
        </button>
      </form>
    </div>
  );
}

export default EditSubCategory;
