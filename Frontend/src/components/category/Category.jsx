import React, { useEffect } from 'react'
import { getCategories } from "../../services/categoryService"
import { setCategories, setError, setLoading } from "../../Redux/Slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import {HashLoader} from "react-spinners"


function Category() {

    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.products);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                dispatch(setLoading(true));
                const response = await getCategories();
                dispatch(setCategories(response));
            }
            catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchCategory();
    }, [dispatch])

        return (
            <div>
                {loading && <HashLoader/>}
                <h2>Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
        )
    }

    export default Category