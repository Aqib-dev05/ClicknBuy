import express from "express";
import productModel from "../models/Product.js";
import SubCategoryModel from "../models/SubCategory.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinay.js";
import {redisClient} from "../config/redisClient.js"

async function handleGetProductsGeneral(req, res) {
  const { q, sub, sortBy, page = 1, limit = 20 } = req.query;

  try {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    const skip = (pageNumber - 1) * limitNumber;



    const query = {};

    // Text search on name / description
    if (q) {
      const regex = new RegExp(q, "i");
      query.$or = [{ name: regex }, { description: regex }];
    }

    if (sub) {
      query.SubCategory = sub;
    }


    // Sorting
    let sort = {};
    switch (sortBy) {
      case "priceAsc":
        sort = { basePrice: 1 };
        break;
      case "priceDesc":
        sort = { basePrice: -1 };
        break;
      case "ratingDesc":
        sort = { ratings: -1 };
        break;
      case "alphabetical":
        sort = { name: 1 };
        break;
      default:
        sort = {};
    }

    const [products, total] = await Promise.all([
      productModel.find(query).populate(
        "SubCategory"
      ).sort(sort).skip(skip).limit(limitNumber),
      productModel.countDocuments(query),
    ]);

  

    return res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber) || 0,
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch products", details: err.message });
  }
}

async function handleGetProductById(req, res) {
  const { id } = req.params;

  const productCacheKey = `product:${id}`;

  try {
    const cachedProduct = await redisClient.get(productCacheKey);
    if (cachedProduct) {
      
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    const product = await productModel.findById(id).populate(
      {
        path: "SubCategory",
        select: "_id name  parent",
        populate: {
          path: "parent",
          select: "_id name ",
        },
      }
    ).populate({
      path: "reviews.user",
      select: "name email",
    })

    if (!product) {
      return res.status(401).send("Product Not Found!!!");
    }

    await redisClient.set(productCacheKey, JSON.stringify(product));
    await redisClient.expire(productCacheKey, 300); // Cache expires in 1 hour

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
}

async function handleGetProductBySlug(req, res) {
  const { slug } = req.params;

   const productCacheKey = `product:slug:${slug}`;

  try {
    const cachedProduct = await redisClient.get(productCacheKey);
    if (cachedProduct) {
     
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    const product = await productModel.findOne({ slug }).populate(
      "SubCategory",

    );

    if (!product) {
      return res.status(401).send("Product Not Found!!!");
    }

    await redisClient.set(productCacheKey, JSON.stringify(product));
    await redisClient.expire(productCacheKey, 300); // Cache expires in 5 minutes
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
}

async function handlePostProduct(req, res) {
  const {
    name,
    description,
    basePrice,
    discountedPrice,
    quantity,
    SubCategory, // this is expected to be SubCategoryModel _id
  } = req.body;

  let slug = name.toLowerCase().replace(/\s+/g, "-");


  try {

    if ((name == undefined && name == null && name == "") ||
      (description == undefined && description == null && description == "") ||
      (SubCategory == undefined && SubCategory == null && SubCategory == "")
    ) {
      return res.status(400).json({ message: "Invalid Parameters" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    // Find subcategory and its parent category to build Cloudinary folder path
    const subCat = await SubCategoryModel.findById(SubCategory?.trim()).populate(
      "parent"
    );

    if (!subCat) {
      console.log(subCat)
      return res.status(400).json({ message: "Invalid subcategory" });
    }

    const categorySlug = subCat.parent?.slug || subCat.parent?.name || "uncategorized";
    const subSlug = subCat.slug;
    const folderPath = `/products/${categorySlug}/${subSlug}`;


    // Upload all images in parallel and collect the responses
    const uploadPromises = req.files.map(file =>
      uploadOnCloudinary(file.path, folderPath)
    );

    let cloudResps;
    try {
      cloudResps = await Promise.all(uploadPromises);
      console.log("All images uploaded successfully:", cloudResps.length);
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError.message);
      return res.status(500).json({
        message: "Image upload failed",
        error: uploadError.message
      });
    }

    // Only keep successful uploads
    // Ensure all uploads have required fields
    const uploadedImages = cloudResps
      .filter(resp => resp && resp.secure_url && resp.public_id)
      .map(resp => ({
        url: resp.secure_url,
        public_id: resp.public_id,
      }));

    if (uploadedImages.length === 0) {
      return res.status(500).json({ message: "No images were successfully uploaded" });
    }

    if (uploadedImages.length !== req.files.length) {
      console.warn(`Expected ${req.files.length} images but got ${uploadedImages.length}`);
      return res.status(500).json({
        message: `Expected ${req.files.length} images but only ${uploadedImages.length} were successfully uploaded`
      });
    }



    // Creating product in DB
    const product = await productModel.create({
      name,
      slug,
      description,
      basePrice,
      discountedPrice,
      quantity,
      SubCategory: SubCategory,
      images: uploadedImages,
    });


    res.status(201).json(product);
  } catch (error) {
    console.error("Error in handlePostProduct:", error);
    res.status(500).json({ message: error.message });
  }
}

async function handlePutProduct(req, res) {
  const { id } = req.params;
  const {
    name,
    description,
    basePrice,
    discountedPrice,
    quantity,
    Subcategory,
  } = req.body;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateFields = {};
    if (name) {
      updateFields.name = name;
      updateFields.slug = name.toLowerCase().replace(/\s+/g, "-");
    }
    if (description !== undefined) updateFields.description = description;
    if (basePrice !== undefined) updateFields.basePrice = basePrice;
    if (discountedPrice !== undefined) updateFields.discountedPrice = discountedPrice;
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (Subcategory) updateFields.SubCategory = Subcategory;

    // Handle new images if any
    if (req.files && req.files.length > 0) {
      // Find subcategory to determine folder path (reusing logic from POST)
      const subCatId = Subcategory || product.SubCategory;
      const subCat = await SubCategoryModel.findById(subCatId).populate("parent", "slug name");

      const categorySlug = subCat?.parent?.slug || subCat?.parent?.name || "uncategorized";
      const subSlug = subCat?.slug || "general";
      const folderPath = `/products/${categorySlug}/${subSlug}`;

      const uploadPromises = req.files.map(file => uploadOnCloudinary(file.path, folderPath));
      const cloudResps = await Promise.all(uploadPromises);

      const newImages = cloudResps
        .filter(resp => resp && resp.secure_url && resp.public_id)
        .map(resp => ({
          url: resp.secure_url,
          public_id: resp.public_id,
        }));

      if (newImages.length > 0) {
        // Append new images to existing ones
        updateFields.images = [...product.images, ...newImages];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).populate("SubCategory");

     await redisClient.del(`product:${id}`);
     await redisClient.del(`product:slug:${updatedProduct.slug}`);
     await redisClient.del(`product:slug:${product.slug}`);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in handlePutProduct:", error);
    res.status(500).json({ message: error.message });
  }
}

async function handleDeleteProductImage(req, res) {
  const { productId, public_id } = req.body;

  try {
    if (!productId || !public_id) {
      return res.status(400).json({ message: "Product ID and Public ID are required" });
    }

    // 1. Delete from Cloudinary
    await deleteFromCloudinary(public_id);

    // 2. Remove from Database
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $pull: { images: { public_id: public_id } } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Image deleted successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error deleting product image:", error);
    res.status(500).json({ message: error.message });
  }
}

async function handleDeleteProduct(req, res) {
  const { id } = req.params;

  try {
    // First, fetch the product to get image public_ids
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(image =>
        deleteFromCloudinary(image.public_id)
      );

      try {
        await Promise.all(deletePromises);
        console.log("All product images deleted from Cloudinary");
      } catch (cloudinaryError) {
        console.error("Error deleting images from Cloudinary:", cloudinaryError.message);
      }
    }

    // Delete product from database
    const deleted = await productModel.findByIdAndDelete(id);

      await redisClient.del(`product:${id}`);
      await redisClient.del(`product:slug:${product.slug}`);

    res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export {
  handleGetProductsGeneral,
  handleGetProductById,
  handleGetProductBySlug,
  handlePostProduct,
  handlePutProduct,
  handleDeleteProduct,
  handleDeleteProductImage,
};
