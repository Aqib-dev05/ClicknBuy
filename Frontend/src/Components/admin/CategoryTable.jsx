import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../services/categoryService";
import { Loader2, Trash2, Plus, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err){
      console.log(err)
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-[rgb(219,68,68)]" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Categories</h2>
        <Link
          to="/admin/categories/add"
          className="flex items-center gap-2 bg-[rgb(219,68,68)] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-semibold active:scale-95"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 line-clamp-1">{category.slug || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3 text-gray-600">
                    <Link to={`/admin/categories/edit/${category._id}`} className="hover:text-blue-600">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(category._id)} className="hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryTable;
