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
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [{
    url:String,
    public_id:String,
    _id:false
  }],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
      rating: {
        type: Number,
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