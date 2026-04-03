import React, { useEffect } from "react";
import { getProducts } from "../../services/productService";
import { Link } from "react-router-dom";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setProducts, setLoading, setError } from "../../Redux/Slices/productSlice"

function ProductTable() {
  const { product, loading } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchProducts = React.useCallback(async () => {
    dispatch(setLoading(true));
    try {
      // Fetching all products (no pagination limit for admin view)
      const data = await getProducts({ limit: 1000 });
      dispatch(setProducts(data || { products: [] }));
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.message || "Failed to fetch products";
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return (
    <div className='flex justify-center items-center h-[70vh]'>
        <Loader2 className="animate-spin h-10 w-10 text-[rgb(219,68,68)]" />
    </div>
  );

  const productList = Array.isArray(product?.products) ? product.products : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-[rgb(219,68,68)] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">B Price <span>$</span> </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">D Price <span>$</span> </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500  tracking-wider">Qty.</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500  tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productList.map((productItem) => (
              <tr key={productItem._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={cloudinaryOptimizer(productItem?.images?.[0]?.url) || "https://via.placeholder.com/50"}
                    alt={productItem.name}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[200px]">{productItem?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{productItem?.basePrice}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {productItem?.discountedPrice || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span className="text-sm text-gray-900">
                    {productItem?.quantity}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/admin/products/${productItem?._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer ">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default ProductTable;
