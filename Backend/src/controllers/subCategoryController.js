import express from "express";
import SubCategoryModel from "../models/SubCategory.js";
import productModel from "../models/Product.js";
import mongoTransection from "../config/mongoTransection.js";

// GET /api/categories
async function handleGetSubCategory(req, res) {
  try {
    const categories = await SubCategoryModel.find().populate(
      "parent"
    );
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error in handleGetSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }
}

async function handleGetSubCategoryByID(req, res) {
  const { id } = req.params;
  try {
    const subCategory = await SubCategoryModel.findById(id).populate(
      "parent"
    );
    return res.status(200).json(subCategory);
  } catch (error) {
    console.error("Error in handleGetSubCategoryByID:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch subcategory", error: error.message });
  }
}


// GET /api/subcategories/category/:catId
async function handleGetSubCategoryByCategory(req, res) {
  const { catId } = req.params;
  try {
    const subCategories = await SubCategoryModel.find({ parent: catId }).populate(
      "parent"
    );
    return res.status(200).json(subCategories);
  } catch (error) {
    console.error("Error in handleGetSubCategoryByCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch subcategories", error: error.message });
  }
}

// POST /api/categories
async function handlePostSubCategory(req, res) {
  let { name, parent } = req.body; //parent must be id

  if (name) name = name.trim();
  let slug = name.toLowerCase().replace(/\s+/g, "-");

  if (
    (name == undefined && name == null && name == "") ||
    (parent == undefined && parent == null && parent == "")
  ) {
    return res.status(400).json({ message: "Invalid Parameters" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const existing = await SubCategoryModel.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "SubCategory already exists" });
    }

    const SubCategory = await SubCategoryModel.create({ name, slug, parent });
    return res.status(201).json(SubCategory);
  } catch (error) {
    console.error("Error in handlePostSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to create SubCategory", error: error.message });
  }
}

// PUT /api/categories/:id
async function handlePutSubCategory(req, res) {
  const { id } = req.params;
  let { name, parent } = req.body;

  if (name) name = name.trim();
  let slug = name.toLowerCase().replace(/\s+/g, "-");


  try {
    const updateFields = {};

    if (name !== undefined && name !== "" && name !== null)
      updateFields.name = name;
    if (slug !== undefined && slug !== "" && slug !== null)
      updateFields.slug = slug;
    if (parent !== undefined && parent !== "" && parent !== null)
      updateFields.parent = parent;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    const updated = await SubCategoryModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error in handlePutSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to update SubCategory", error: error.message });
  }
}

// DELETE /api/categories/:id
async function handleDeleteSubCategory(req, res) {
  const { id } = req.params;

  try {
    //  porduction k liye,
    // await mongoTransection(async (session) => {

    //   await productModel.deleteMany({ SubCategory: id }).session(session);
    //   const sub = await SubCategoryModel.findByIdAndDelete(id).session(session);

    //   if (!sub) {
    //     throw new Error("User not found");
    //   }
    // });
    // res
    //   .status(200)
    //   .json({
    //     message: "SubCategory and associated Products deleted successfully",
    //   });

    await productModel.deleteMany({ SubCategory: id });
    const deleted = await SubCategoryModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    return res
      .status(200)
      .json({ message: "SubCategory and associated Products deleted successfully" });

  } catch (error) {
    console.error("Error in handleDeleteSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete SubCategory", error: error.message });
  }
}

export {
  handleGetSubCategory,
  handleGetSubCategoryByCategory,
  handlePostSubCategory,
  handlePutSubCategory,
  handleDeleteSubCategory,
  handleGetSubCategoryByID,
};
