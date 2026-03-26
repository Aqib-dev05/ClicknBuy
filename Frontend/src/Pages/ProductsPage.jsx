import React, { useEffect } from "react";
import ProductGrid from "../Components/product/ProductGrid";
import { getProducts } from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setError,
  setLoading,
} from "../Redux/Slices/productSlice";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/product/Pagination";
import Filters from "../Components/filters/Filters";

function ProductsPage() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    q: searchParams.get("q") || "",
    sub: searchParams.get("sub") || "",
    sortBy: searchParams.get("sortBy") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getProducts({
          ...params,
        });
        if (data) {
          dispatch(setProducts(data));
          toast.success("Fetched Products successful!");
        }
      } catch (error) {
        const message = error?.response?.data?.message;
        toast.error(`Something went wrong. ${message}`);
        dispatch(setError(message || "An unexpected error occurred."));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-center my-6 text-3xl font-bold">
        <span className="text-red-600   ">All</span> Products{" "}
      </h1>
      <br /><br />
 
     <Filters
     searchParams={searchParams}
     setSearchParams={setSearchParams}
     />


      <br /><br />
      <ProductGrid product={product} />
      <br />
      {product.totalPages > 1 && (
        <Pagination
          page={params.page}
          totalPages={product?.totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductsPage;
