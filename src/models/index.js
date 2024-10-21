import { DataTypes } from "sequelize";
import Product from "./products.model.js";
import Category from "./category.model.js";
import Subcategory from "./subCategory.model.js";
import Order from "./order.model.js";
import { Cart, CartItem } from "./cart.model.js";

const FOREIGN_CONFIG = { allowNull: false, type: DataTypes.UUID };

Category.hasMany(Subcategory, { FOREIGN_CONFIG, foreignKey: 'categoryId' });

Product.belongsTo(Subcategory, { FOREIGN_CONFIG });

Cart.belongsTo(Product, {
  ...FOREIGN_CONFIG,
  through: CartItem,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

export { Product, Category, Subcategory, Order, Cart, CartItem };
