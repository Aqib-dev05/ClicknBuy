import express from "express";
import SubCategory from "../models/SubCategory.js";

// GET /api/categories
async function handleGetSubCategory(req, res) {
  try {
    const categories = await SubCategory.find().populate(
      "parent",
      "name, slug"
    );
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error in handleGetSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }


}// GET /api/subcategories/category/:catId
async function handleGetSubCategoryByCategory(req, res) {
  const { catId } = req.params;
  try {
    const subCategories = await SubCategory.find({ parent: catId }).populate(
      "parent",
      "name slug"
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
  const { name, slug,parent } = req.body; //parent must be id

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const existing = await SubCategory.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "SubCategory already exists" });
    }

    const SubCategory = await SubCategory.create({ name, slug,parent });
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
  const { name, slug,parent } = req.body;

  try {
    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (slug !== undefined) updateFields.slug = slug;
    if (parent !== undefined) updateFields.parent = parent;


    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    const updated = await SubCategory.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
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
    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    return res
      .status(200)
      .json({ message: "SubCategory deleted successfully" });
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
};
