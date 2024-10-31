import { DataTypes } from "sequelize";
import slugify from "slugify";
import sequelize from "../utils/postgresql.config.js";

const SubCategory = sequelize.define('SubCategory', {
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
  store: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  }
}, {
  tableName: 'subCategories',
  timestamps: true,
  hooks: {
    beforeCreate: (subCategory) => {
      if(subCategory.name) {
        subCategory.slug = slugify(subCategory.name).toLowerCase();
      }
    },
  },
});

export default SubCategory;