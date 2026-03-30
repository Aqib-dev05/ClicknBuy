import React, { useEffect } from 'react'
import ProductGrid from '../product/ProductGrid'
import { Link } from 'react-router-dom'
import Button from '../layouts/Button'
import { getProducts } from '../../services/productService'
import { useSelector,useDispatch } from 'react-redux'
import {setProducts,setError,setLoading} from "../../Redux/Slices/productSlice"
import { HashLoader } from 'react-spinners'

function FeaturedProducts() {

   const dispatch = useDispatch();
   const {product,loading} = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getProducts({limit:5});
        dispatch(setProducts(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [dispatch]);


  return (
    <section className='mt-5  md:px-4 px-4 lg:px-10 2xl:px-16  mx-auto'>
        <h2 className='text-2xl my-4 font-bold font-sans'>Explore Our Products</h2>
        {loading && <HashLoader/>}
        <ProductGrid product={product} />
        <br />
        <Link to={"/products"} className='flex items-center justify-center my-4'>
        <Button text={"View All Products"}/>
        </Link>

    </section>
  )
}

export default FeaturedProducts