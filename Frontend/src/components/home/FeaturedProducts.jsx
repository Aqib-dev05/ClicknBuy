import React, { useEffect } from 'react'
import ProductGrid from '../product/ProductGrid'
import { Link } from 'react-router-dom'
import Button from '../layouts/Button'
import { getProducts } from '../../services/productService'
import { useSelector,useDispatch } from 'react-redux'
import {setProducts,setError,setLoading} from "../../Redux/Slices/productSlice"
import { HashLoader } from 'react-spinners'
import { motion as Motion } from 'framer-motion'

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
    <Motion.section
      className='mt-5  md:px-4 px-4 lg:px-10 2xl:px-16  mx-auto'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
        <Motion.h2
          className='text-2xl my-4 font-bold font-sans'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore Our Products
        </Motion.h2>
        {loading && <HashLoader/>}
        <ProductGrid product={product} />
        <br />
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to={"/products"} className='flex items-center justify-center my-4'>
            <Button text={"View All Products"}/>
          </Link>
        </Motion.div>

    </Motion.section>
  )
}

export default FeaturedProducts