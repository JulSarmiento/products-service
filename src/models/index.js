import { DataTypes } from "sequelize";
import Product from "./products.model.js";
import Category from "./category.model.js";
import Subcategory from "./subCategory.model.js";
import Order from "./order.model.js";
import { Cart, CartItem } from "./cart.model.js";
import Identity from "./identity.model.js";

const FOREIGN_CONFIG = { allowNull: false, type: DataTypes.UUID };

const CASCADE_CONFIG = {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
};

Category.hasMany(Subcategory, { FOREIGN_CONFIG, foreignKey: "categoryId" });

Subcategory.belongsTo(Category, { FOREIGN_CONFIG, foreignKey: "categoryId" });

Subcategory.hasMany(Product, { FOREIGN_CONFIG, foreignKey: "subcategoryId" });

Product.belongsTo(Subcategory, { FOREIGN_CONFIG, foreignKey: "subcategoryId" });

Product.belongsToMany(Cart, {
  ...FOREIGN_CONFIG,
  ...CASCADE_CONFIG,
  through: CartItem,
});

Cart.belongsToMany(Product, {
  ...FOREIGN_CONFIG,
  ...CASCADE_CONFIG,
  through: CartItem,
});

export { Product, Category, Subcategory, Order, Cart, CartItem, Identity };
