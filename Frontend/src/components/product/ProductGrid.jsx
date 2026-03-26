import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import {getProducts} from "../../services/productService"
import { useDispatch,useSelector } from 'react-redux'
import {setProducts,setError,setLoading} from "../../Redux/Slices/productSlice"
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function ProductGrid({num}) {
   
   const dispatch =useDispatch();
   const {product} = useSelector((state)=>state.products);

    useEffect(() => {
      const fetchProducts = async () => {
        dispatch(setLoading(true));
        try {
          const data = await getProducts({
            //queryParams add krny hein yahan
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
    }, []);

    useEffect(() => {
    }, [product]);
   
  return (
    <section className='mx-auto  flex flex-wrap justify-center items-center gap-6'>
     {product && Array.isArray(product.products) && product.products.slice(0, num).map((item) => (
         <ProductCard key={item._id} product={item} payload={item} />
      
     ))}
    </section>
  )
}

export default ProductGrid