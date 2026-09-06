import userModel from "../models/User.js" 
import categoryModel from "../models/Category.js"
import subCategoryModel from "../models/SubCategory.js"
import productModel from "../models/Product.js"
import fs from "fs"
 
 
 async function seedAdmin(){
  try {
    const adminInDb = await userModel.findOne({role:"admin"});

    if(!adminInDb){
      const admin = await userModel.create({
        name:"Admin",
        email:"admin@example.com",
        password:"admin",
        role:"admin"
      })
      console.log("Admin created successfully!")
    }
    else{
      console.log("Admin already present")
    }
  } catch (error) {
    console.log(error.message)
  }
  
 }

async function seedCategory() {
  try {
    const catCount = await categoryModel.countDocuments();

    if (catCount === 0) {
      const categories = JSON.parse(
        fs.readFileSync(new URL("../data/category.json", import.meta.url), "utf-8")
      );

      await categoryModel.insertMany(categories);
      console.log("Category created successfully!");
    } else {
      console.log("Category already present");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const seedSubCategory = async () => {
  try {

    const subCatCount = await subCategoryModel.countDocuments();

    if (subCatCount > 0) {
      console.log("Subcategories already present");
      return;
    }

    const categories = await categoryModel.find();

    const subCategories = JSON.parse(
      fs.readFileSync(
        new URL("../data/subCategory.json", import.meta.url),
        "utf-8"
      )
    );

    //  Map placeholders with real IDs
    const categoryMap = {
      MOBILE_PHONES_ID: categories.find(c => c.slug === "mobile-phones")?._id,
      LAPTOPS_ID: categories.find(c => c.slug === "laptops")?._id,
      COMPUTER_COMPONENTS_ID: categories.find(c => c.slug === "computer-components")?._id,
      COMPUTER_ACCESSORIES_ID: categories.find(c => c.slug === "computer-accessories")?._id,
      SNACKS_ID: categories.find(c => c.slug === "snacks")?._id,
      DAIRY_PRODUCTS_ID: categories.find(c => c.slug === "dairy-products")?._id,
      GROCERY_ID: categories.find(c => c.slug === "grocery")?._id,
      BEVERAGES_ID: categories.find(c => c.slug === "beverages")?._id,
      PERSONAL_HEALTH_CARE_ID: categories.find(c => c.slug === "personal-health-care")?._id,
      HOUSEHOLD_ITEMS_ID: categories.find(c => c.slug === "household-items")?._id
    };

    // 4️⃣ Replace parent placeholder with actual ObjectId
    const formattedSubCats = subCategories.map(sub => ({
      ...sub,
      parent: categoryMap[sub.parent]
    }));

    // 5️⃣ Insert
    await subCategoryModel.insertMany(formattedSubCats);

    console.log("Subcategories created successfully!");

  } catch (error) {
    console.log(error.message);
  }
};

const seedProducts = async ()=>{
    try {
      const productCount = await productModel.countDocuments();
      if(productCount > 0){
        console.log("Products Already Present")
      }
      else{
        // Fetch all subcategories from DB
        const subCategories = await subCategoryModel.find();

        // Build a map: slug -> ObjectId
        const subCategoryMap = {};
        subCategories.forEach(sub => {
          subCategoryMap[sub.slug] = sub._id;
        });

        const products = JSON.parse(
          fs.readFileSync(new URL("../data/products.json", import.meta.url), "utf-8")
        );

        // Replace slug placeholders with actual SubCategory ObjectIds
        const formattedProducts = products.map(product => ({
          ...product,
          SubCategory: subCategoryMap[product.SubCategory]
        }));

        await productModel.insertMany(formattedProducts);
        console.log("Products created successfully!")
      }
      
    } catch (error) {
      console.log(error.message)
    }
}

 export {seedAdmin,seedProducts,seedCategory,seedSubCategory};