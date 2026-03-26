import express from "express";
import productModel from "../models/Product.js";
import SubCategoryModel from "../models/SubCategory.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinay.js";

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
      default:
        sort = {};
    }

    const [products, total] = await Promise.all([
      productModel.find(query).sort(sort).skip(skip).limit(limitNumber),
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

  try {
    const product = await productModel.findById(id).populate(
      {
        path:"SubCategory",
        select:"name slug ",
      }
    );

    if (!product) {
      return res.status(401).send("Product Not Found!!!");
    }
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

  try {
    const product = await productModel.findOne({slug}).populate(
      "SubCategory",
      
    );

    if (!product) {
      return res.status(401).send("Product Not Found!!!");
    }
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
    slug,
    description,
    basePrice,
    discountedPrice,
    quantity,
    Subcategory, // this is expected to be SubCategoryModel _id
    ratings,
  } = req.body;
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    // Find subcategory and its parent category to build Cloudinary folder path
    const subCat = await SubCategoryModel.findById(Subcategory?.trim()).populate(
      "parent",
      "slug name"
    );

    if (!subCat) {
      console.log(subCat)
      return res.status(400).json({ message: "Invalid subcategory" });
    }

    const categorySlug = subCat.parent?.slug || subCat.parent?.name || "uncategorized";
    const subSlug = subCat.slug ;
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
      // store subcategory reference in `category` field of Product schema
      category:Subcategory,
      ratings,
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
    slug,
    description,
    basePrice,
    discountedPrice,
    quantity,
    Subcategory,
    ratings
  } = req.body;

  try {
    const allowedFields = {
      name,
      slug,
      description,
      basePrice,
      discountedPrice,
      quantity,
      Subcategory,
      ratings,
    };

    const updateFields = {};
    for (const [key, value] of Object.entries(allowedFields)) {
      if (value !== undefined) {
        updateFields[key] = value;
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }
    
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in handlePutProduct:", error);
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
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete product from database
    const deleted = await productModel.findByIdAndDelete(id);
    
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
};
