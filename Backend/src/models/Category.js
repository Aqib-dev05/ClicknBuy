import mongoose, { mongo } from "mongoose"

const catSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        trim: true
    },
}, { timestamps: true })

const Category = mongoose.model("Category", catSchema)
export default Category;