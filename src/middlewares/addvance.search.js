import { Op } from "sequelize";

const operatorsMap = {
  eq: Op.eq,
  ne: Op.ne,
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lt,
  lte: Op.lte,
  like: Op.like,
  iLike: Op.iLike,
  in: Op.in,
  between: Op.between,
};
const advanceSearch =
  (excludes = [], likeFields = [], numericFields = []) =>
  (req, _res, next) => {
    const EXCLUDES = ["page", "size", "limit", "offset", ...excludes];

    req.where = Object.entries(req.query).reduce((filters, [key, value]) => {
      if (EXCLUDES.includes(key)) return filters;

      const [field, operator] = key.split("_");
      let sequelizeOperator = operatorsMap[operator] || Op.eq;

      if (likeFields.includes(field)) {
        sequelizeOperator = Op.iLike;
        filters[field] = { [sequelizeOperator]: `%${value}%` };
      } else if (numericFields.includes(field)) {
        if (operator === "between") {
          const [min, max] = value.split(",").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            filters[field] = { [Op.between]: [min, max] };
          }
        } else {
          const numericValue = Number(value);
          if (!isNaN(numericValue)) {
            filters[field] = { [sequelizeOperator]: numericValue };
          }
        }
      } else {
        filters[field] = { [sequelizeOperator]: value };
      }

      return filters;
    }, {});

    next();
  };

export default advanceSearch;
