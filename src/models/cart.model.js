import { DataTypes } from "sequelize";
import sequelize from "../utils/postgresql.config.js";

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "carts",
    timestamps: true,
  }
);

const CartItem = sequelize.define(
  "CartItem",
  {
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "cartItem",
    timestamps: true,
  }
);

export { Cart, CartItem };
