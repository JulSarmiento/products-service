import { Op, Sequelize } from "sequelize";

const operatorsMap = {
  eq: Op.eq,
  ne: Op.ne,
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lt,
  lte: Op.lte,
  like: Op.like,
  in: Op.in,
};

const advanceSearch =
  (excludes = []) =>
  (req, _res, next) => {
    const EXCLUDES = ["page", "size", "limit", "offset", ...excludes];
   
    req.where = Object.entries(req.query).reduce((filters, [key, value]) => {
      if (EXCLUDES.includes(key)) return filters;
      const [field, operator] = key.split("_"); // Extrae las operaciones con _
      const sequelizeOperator = operatorsMap[operator] || Op.eq; //Pone eq como default siempre que no haya operadores o estén mal escroto
      filters[field] = { [sequelizeOperator]: value };
      return filters;
    }, {});

    next();
  };

export default advanceSearch;
