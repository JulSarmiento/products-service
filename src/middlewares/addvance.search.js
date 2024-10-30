import { Op, Sequelize } from "sequelize";

const advanceSearch =
  (excludes = []) =>
  (req, _res, next) => {
    const where = {};
    const include = [];

    const EXCLUDES = ["page", "size", "limit", "offset", ...excludes];
    console.log("addvanceSearch.excludes", EXCLUDES);

    Object.entries(req.query).forEach(([key, value]) => {
      // Ignora excluyentes
      if (EXCLUDES.includes(key)) return;

      const keys = key.split(".");
      let currentWhere = where;
      let currentInclude = include;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          if (k.includes("__lte")) {
            currentWhere[k.replace("__lte", "")] = {
              [Op.lte]: value,
            };
          } else if (k.includes("__in")) {
            currentWhere[k.replace("__in", "")] = {
              [Op.in]: value.split(","),
            };
          } else if (k.includes("__startWith")) {
            currentWhere[k.replace("__startWith", "")] = {
              [Op.startsWith]: `${value}%`,
            };
          } else if (k.includes("__endsWith")) {
            currentWhere[k.replace("__endsWith", "")] = {
              [Op.endsWith]: `%${value}`,
            };
          } else {
            currentWhere[k] = {
              [Op.iLike]: `%${value}%`,
            };
          }
        } else {
          let relation = currentInclude.find((inc) => inc.as === k);
          if (!relation) {
            relation = {
              association: k,
              where: {},
              include: [],
            };
            currentInclude.push(relation);
          }
          currentWhere = relation.where;
          currentInclude = relation.include;
        }
      });
    });

    req.where = where;
    req.include = include;
    next();
  };

export default advanceSearch();

export const customSearch = advanceSearch;
