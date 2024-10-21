import { DataTypes } from "sequelize";
import slugify from "slugify";
import sequelize from "../utils/postgresql.config.js"

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
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageAlt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 350],
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1, 10],
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
    hooks: {
      beforeCreate: (product) => {
        if(product.name) {
          product.slug = slugify(product.name, { lower: true });
        }
      },
      beforeUpdate: (product) => {
        if(product.name) {  
        product.slug = slugify(product.name, { lower: true });
        }
      },
    },
  }
);

export default Product;