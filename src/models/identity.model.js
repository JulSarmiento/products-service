import { DataTypes } from "sequelize";
import slugify from "slugify";
import sequelize from "../utils/postgresql.config.js";

const Identity = sequelize.define(
  "Identity",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    header: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (
            !value.companyName ||
            !value.firstLink ||
            !value.secondLink ||
            !value.thirdLink ||
            !value.seeAll ||
            !value.seeAllDescription ||
            !value.logoAlt ||
            !value.logoSrc
          ) {
            throw new Error(
              "The JSON must contain the properties companyName, firstLink, secondLink, thirdLink, seeAll, seeAllDescription, logoAlt, logoSrc"
            );
          }
        },
      },
    },
    hero: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (
            !value.title ||
            !value.description ||
            !value.buttonText ||
            !value.slug ||
            !value.imageSrc ||
            !value.imageAlt
          ) {
            throw new Error(
              "The JSON must contain the properties title, description, buttonText, slug, imageSrc, imageAlt"
            );
          }
        },
      },
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (!value.title) {
            throw new Error(
              "The JSON must contain the properties title"
            );
          }
        },
      },
    },
    banner: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (
            !value.title ||
            !value.description ||
            !value.buttonText ||
            !value.slug 
          ) {
            throw new Error(
              "The JSON must contain the properties title, description, buttonText, slug"
            );
          }
        },
      },
    },
    testimonial: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        hasRequiredProperties(value) {
          if (
            !value.logoSrc ||
            !value.quote ||
            !value.authorImageSrc ||
            !value.authorName ||
            !value.authorRole
          ) {
            throw new Error(
              "The JSON must contain the properties logoSrc, quote, authorImageSrc, authorName, authorRole"
            );
          }
        },
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
  },
  {
    tableName: "identities",
    timestamps: true,
    hooks: {
      beforeValidate: (identity) => {
        if (identity.companyName) {
          identity.slug = slugify(identity.companyName).toLowerCase();
        }
      },
    },
  }
);

export default Identity;
