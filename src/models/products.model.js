import { DataTypes } from "sequelize";
import sequelize from "../utils/postgreslq.config.js"

const Product = sequelize.define( 'Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1, 10],
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1, 10],
      },
    }
  }, {
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;