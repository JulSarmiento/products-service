import { DataTypes } from "sequelize";
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
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'subCategories',
  timestamps: true,
});

export default SubCategory;