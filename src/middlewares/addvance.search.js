import { Op, Sequelize } from "sequelize";

export default (req, _res, next) => {
  const where = {};

  Object.entries(req.query).forEach(([key]) => {
    // offset
    if (key === "page") {
      where.offset = parseInt((req.query.page || 1, 10) - 1);

      // limit
    } else if (key === "size") {
      where.limit = parseInt(req.query.size, 10);

      // in
    } else if (key.includes(".")) {
      const modKey = `$${key}$`;
      where[modKey] = Sequelize.where(
        Sequelize.fn('unaccent', Sequelize.col(key)), {
          [Op.iLike]:`%${req.query[key]}%`
      });
    } else if (key.includes("__lte")) {
      where[key.replace("__lte", "")] = {
        [Op.lte]: req.query[key],
      };
    } else if (key.includes("__in")) {
      where[key.replace("__in", "")] = {
        [Op.in]: req.query[key].split(","),
      };

      // startWith
    } else if (key.includes("__startWith")) {
      where[key.replace("__startWith", "")] = {
        [Op.startsWith]: `${req.query[key]}%`,
      };

      // endWith
    } else if (key.includes("__endsWith")) {
      where[key.replace("__endsWith", "")] = {
        [Op.endsWith]: `%${req.query[key]}`,
      };
    } else {
      where[key] = Sequelize.where(
        Sequelize.fn('unaccent', Sequelize.col(key)), {
          [Op.iLike]:`%${req.query[key]}%`
      });
    }
  });

  req.where = where;

  next();
};