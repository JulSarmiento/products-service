import { DataTypes } from "sequelize";
import sequelize from "../utils/postgresql.config.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: (
        "Pending",
        "Payment Verified",
        "Processing",
        "Shipped",
        "Delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    name: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.firstName || !value.lastName) {
            throw new Error(
              "El JSON debe contener las propiedades firstName y lastName"
            );
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    document: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.type || !value.number) {
            throw new Error(
              "El JSON debe contener las propiedades type y number"
            );
          }
        },
      },
    },
    phone: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.area || !value.number) {
            throw new Error(
              "El JSON debe contener las propiedades area y number"
            );
          }
        },
      },
    },
    payment: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (
            !value.reference    ||
            !value.method       ||
            !value.shippingType ||
            !value.shippingCost ||
            !value.status
          ) {
            throw new Error(
              "El JSON debe contener las propiedades reference, method, shippingType, shippingCost y status"
            );
          }
        },
      },
    },
    shipping: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.address || !value.city || !value.state || !value.zip) {
            throw new Error(
              "El JSON debe contener las propiedades street, city, state y zip"
            );
          }
        },
      },
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.products || !value.total) {
            throw new Error(
              "El JSON debe contener las propiedades products y total"
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;