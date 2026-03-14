import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    categories: [],
    subCategories: [],
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => { state.product = action.payload },
    setCategories: (state, action) => { state.categories = action.payload },
    setSubCategories: (state, action) => { state.subCategories = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
  }
})

export const { setProducts, setCategories, setSubCategories, setLoading, setError } = productSlice.actions
export default productSlice.reducer