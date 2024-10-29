import { Op, Sequelize } from "sequelize";

const DEFAULT_EXCLUDE = ["page", "size", "limit", "offset"];

const addvanceSearch = (excludes = []) => (req, _res, next) => {
  const where = {};

  Object.entries(req.query).forEach(([key, value]) => {
    // Ignora excluyentes
    if ([...DEFAULT_EXCLUDE, ...excludes].includes(key)) return;

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