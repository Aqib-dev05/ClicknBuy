import Cart from "../models/Cart.js";

// GET /api/cart
async function handleGetCart(req, res) {
  const userId = req.user?._id || req.user?.id;

  try {
    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product",
      "_id name basePrice discountedPrice images slug",
    );

    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error in handleGetCart:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch cart", error: error.message });
  }
}

// POST /api/cart
async function handleAddToCart(req, res) {
  const userId = req.user?._id || req.user?.id;
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (!quantity) {
    quantity = 1;
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await cart.populate(
      "products.product",
      "_id name basePrice discountedPrice images slug",
    );

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in handleAddToCart:", error);
    return res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
}

//Post /api/cart/bulk-insertion
async function handleBulkInsertion(req, res) {
  const userId = req.user?._id || req.user?.id;
  let { items } = req.body; //array of productIds
  const quantity = 1;

  if (typeof items === "string") {
    items = JSON.parse(items);
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    items.forEach((productId) => {
      const itemIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (itemIndex === -1) {
        cart.products.push({ product: productId, quantity });
      }
      else {
        cart.products[itemIndex].quantity += quantity;
      }
    });

    await cart.save();

    return res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    console.error("Error in handleBulkInsertion:", error);
    return res
      .status(500)
      .json({ message: "Failed to bulk insert to cart", error: error.message });
  }
}

// PUT /api/cart/:productId
async function handleUpdateCartItem(req, res) {
  const userId = req.user?._id || req.user?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 1) {
    return res.status(400).json({ message: "Valid quantity is required" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
      await cart.save();
      const updatedCart = await cart.populate(
        "products.product",
        "name basePrice discountedPrice images slug",
      );
      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error in handleUpdateCartItem:", error);
    return res
      .status(500)
      .json({ message: "Failed to update cart", error: error.message });
  }
}

// DELETE /api/cart/:productId
async function handleRemoveFromCart(req, res) {
  const userId = req.user?._id || req.user?.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    const updatedCart = await cart.populate(
      "products.product",
      "name basePrice discountedPrice images slug",
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in handleRemoveFromCart:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove item", error: error.message });
  }
}

// DELETE /api/cart
async function handleClearCart(req, res) {
  const userId = req.user?._id || req.user?.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    return res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error in handleClearCart:", error);
    return res
      .status(500)
      .json({ message: "Failed to clear cart", error: error.message });
  }
}

//bulk update controller. Put request for many product's quantity in cart
async function handleBulkUpdate(req, res) {
  const userId = req.user?._id || req.user?.id;
  const { updates } = req.body;
  if (!Array.isArray(updates)) {
    return res.status(400).json({ message: "Updates must be an array" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    updates.forEach((update) => {
      const itemIndex = cart.products.findIndex(
        (item) => item.product.toString() === update.productId,
      );
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity = update.quantity;
      }
    });

    await cart.save();
    const updatedCart = await cart.populate(
      "products.product",
      "name basePrice discountedPrice images slug",
    );

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in handleBulkUpdate:", error);
    return res
      .status(500)
      .json({ message: "Failed to bulk update cart", error: error.message });
  }
}

export {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartItem,
  handleRemoveFromCart,
  handleClearCart,
  handleBulkUpdate,
  handleBulkInsertion,
};
