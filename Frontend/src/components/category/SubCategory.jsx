import React, { useEffect } from 'react'
import { getSubCategories } from "../../services/subCategoryService"
import { setSubCategories, setError, setLoading } from "../../Redux/Slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import {HashLoader} from "react-spinners"


function SubCategory() {

    const dispatch = useDispatch();
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
        console.log(subCategories)
    }, [dispatch])

        return (
            <div>
                {loading && <HashLoader/>}
                
                <h2>SubCategories</h2>
                <ul>
                    {subCategories && subCategories.map((subCategory) => (
                        <li key={subCategory.id}>{subCategory.name}</li>
                    ))}
                </ul>
            </div>
        )
    }

    export default SubCategory