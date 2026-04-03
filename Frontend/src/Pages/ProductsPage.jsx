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
import { motion as Motion } from "framer-motion";

function ProductsPage() {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
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
      dispatch(setProducts(null));
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
        console.log(error)
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
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Motion.h1
        className="text-center my-6 text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-red-600   ">All</span> Products{" "}
      </Motion.h1>
      <br />
      <br />

      <Filters searchParams={searchParams} setSearchParams={setSearchParams} />

      <br />
      <br />
      {loading ? (
        <div className=" flex w-full justify-center items-center my-8 ">
          <HashLoader />
        </div>
      ) : (
        <ProductGrid product={product} />
      )}

      <br />

      {product?.totalPages > 1 && (
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
    </Motion.div>
  );
}

export default ProductsPage;
