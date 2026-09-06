import React, { useEffect } from 'react'
import { getSubCategories } from "../../services/subCategoryService"
import { setSubCategories, setError, setLoading } from "../../Redux/Slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { HashLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'

function SubCategory() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategories, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getSubCategories();
        dispatch(setSubCategories(response));
      }
      catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchSubCategory();
  }, [dispatch])


  async function productsView(sub) {
    navigate(`/products?sub=${sub}`);
  }

  return (
    <Motion.div
      className='flex flex-wrap gap-4 p-3 md:gap-8  md:p-8 max-w-7xl mx-auto justify-center items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <HashLoader />}
      {subCategories && subCategories.length > 0 ? (
        subCategories.map((sub, index) => (
          <Motion.div

            key={sub._id}
            className="group p-6 min-w-[190px] min-h-[120px] flex flex-col justify-center items-center bg-gray-200 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h4 className="font-semibold text-lg text-gray-800 group-hover:text-red-600 transition-colors">
              {sub.name}
            </h4>
            <p
              onClick={() => productsView(sub._id)}
              className="text-sm cursor-pointer font-medium hover:text-blue-600 hover:italic transition-all duration-[.3s] text-gray-500 mt-2">
              View Products
            </p>
          </Motion.div>
        ))
      ) : !loading && (
        <div>No sub-categories found.</div>
      )}
    </Motion.div>
  )
}

export default SubCategory