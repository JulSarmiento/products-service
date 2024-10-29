import { Op, Sequelize } from "sequelize";

const addvanceSearch =
  (excludes = []) =>
  (req, _res, next) => {
    const where = {};

    const EXCLUDES = ["page", "size", "limit", "offset", ...excludes];
    console.log("addvanceSearch.excludes", EXCLUDES)

    Object.entries(req.query).forEach(([key, value]) => {
      // Ignora excluyentes
      if (EXCLUDES.includes(key)) return;

      if (key.includes("__lte")) {
        where[key.replace("__lte", "")] = {
          [Op.lte]: value,
        };
      } else if (key.includes("__in")) {
        where[key.replace("__in", "")] = {
          [Op.in]: value.split(","),
        };
      } else if (key.includes("__startWith")) {
        where[key.replace("__startWith", "")] = {
          [Op.startsWith]: `${value}%`,
        };
      } else if (key.includes("__endsWith")) {
        where[key.replace("__endsWith", "")] = {
          [Op.endsWith]: `%${value}`,
        };
      } else {
        where[key] = {
          [Op.iLike]: `%${value}%`,
        };
      }
    });

    req.where = where;
    next();
  };

export default addvanceSearch();

export const customSearch = addvanceSearch;
