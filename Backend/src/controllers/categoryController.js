import express from "express";
import Category from "../models/Category.js";
import subCategoryModel from "../models/SubCategory.js";
import productModel from "../models/Product.js";
import mongoTransection from "../config/mongoTransection.js";
import SubCategory from "../models/SubCategory.js";

// GET /api/categories
async function handleGetCategory(req, res) {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error in handleGetCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }
}

// POST /api/categories
async function handlePostCategory(req, res) {
  const { name, slug } = req.body;

  if (name == undefined && name == null && name == "") {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, slug });
    return res.status(201).json(category);
  } catch (error) {
    console.error("Error in handlePostCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to create category", error: error.message });
  }
}

// PUT /api/categories/:id
async function handlePutCategory(req, res) {
  const { id } = req.params;
  const { name, slug } = req.body;

  try {
    const updateFields = {};

    if (name !== undefined && name !== "" && name !== null)
      updateFields.name = name;
    if (slug !== undefined && slug !== "" && slug !== null)
      updateFields.slug = slug;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error in handlePutCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to update category", error: error.message });
  }
}

// DELETE /api/categories/:id
async function handleDeleteCategory(req, res) {
  const { id } = req.params;

  try {
    const subCat = await subCategoryModel.find({ parent: id });
    const subCatIds = subCat.map((sub) => sub._id);

    //porduction k liye,
    // await mongoTransection(async (session) => {
    //   //delete products
    //   await productModel
    //     .deleteMany({
    //       SubCategory: { $in: subCatIds },
    //     })
    //     .session(session);

    //   //delete subCategories
    //   await subCategoryModel.deleteMany({ parent: id }).session(session);

    //   //delete category
    //   const cat = await Category.findByIdAndDelete(id).session(session);

    //   if (!cat) {
    //     throw new Error("Category not found");
    //   }
    // });
    // res
    //   .status(200)
    //   .json({ message: "Category and associated data deleted successfully" });

    await productModel.deleteMany({ SubCategory: { $in: subCatIds } });
    await subCategoryModel.deleteMany({ parent: id });
    const cat = await Category.findByIdAndDelete(id);
    if (!cat) {
      throw new Error("Category not found");
    }
    res
      .status(200)
      .json({ message: "Category and associated data deleted successfully" });
      
      
  } catch (error) {
    console.error("Error in handleDeleteCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete category", error: error.message });
  }
}

export {
  handleGetCategory,
  handlePostCategory,
  handlePutCategory,
  handleDeleteCategory,
};
