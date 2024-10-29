import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProductById,
} from "./products.controller.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "./category.controller.js";  

import {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategoryById,
} from "./subCategories.controller.js";

import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from "./order.controller.js";

import {
  getCartById,
  addProductToCart
} from "./cart.controller.js";

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProductById,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategoryById,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  getCartById,
  addProductToCart,
};
