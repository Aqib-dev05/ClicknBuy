import mongoose from "mongoose";

const subCatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
}, { timestamps: true });

const SubCategory = mongoose.model("SubCategory", subCatSchema);
export default SubCategory;
