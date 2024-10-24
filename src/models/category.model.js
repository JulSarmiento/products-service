import { DataTypes } from "sequelize";
import slugify from "slugify";
import sequelize from "../utils/postgresql.config.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageAlt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
  {
    tableName: "categories",
    timestamps: true,
    hooks: {
      beforeValidate: (category) => {
        if (category.name) {
          category.slug = slugify(category.name).toLowerCase();
        }
      },
    },
  }
);

export default Category;
