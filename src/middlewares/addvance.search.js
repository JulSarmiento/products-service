import { Op, Sequelize } from "sequelize";

export default (req, _res, next) => {
  const where = {};

  Object.entries(req.query).forEach(([key, value]) => {
    if (key === "page" || key === "size") return;

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
        [Op.iLike]: `%${value}%`
      };
    }
  });

  req.where = where;
  next();
};