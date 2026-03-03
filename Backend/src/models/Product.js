import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    trim: true,
    type: String,
  },
  description: String,
  basePrice: Number,
  discountedPrice:{
    type: Number,
    default: function () {
      return this.basePrice;
    },
  },
  quantity: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  images: [String],
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

 const Product = mongoose.model("Product",ProductSchema);
 export default Product;