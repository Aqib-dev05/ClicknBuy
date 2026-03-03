import express from "express";
import productModel from "../models/Product.js";

async function handleGetProductsGeneral(req, res) {
  const { q, category, sub, sortBy, page = 1, limit = 20 } = req.query;

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

    // Filter by category (expects category id)
    if (category) {
      query.category = category;
    }

    // Filter by subcategory (expects subcategory id, assumes Product has subCategory field)
    if (sub) {
      query.subCategory = sub;
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
    const product = await productModel.findById(id);

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
    const product = await productModel.findOne(slug);

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
    category,
    ratings,
  } = req.body;
}

async function handlePutProduct(req, res) {}

async function handleDeleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      res.status(401).send("Product not found to be delete");
    }
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
