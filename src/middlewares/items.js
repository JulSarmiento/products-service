import httpStatus from "http-status";
import { Order, Product, Cart } from "../models/index.js";

/**
 * Middleware para buscar un elemento en la base de datos utilizando Sequelize.
 *
 * Busca un elemento en la base de datos basado en un campo específico (por defecto, 'id'),
 * y agrega el elemento encontrado a `req` bajo el nombre del modelo.
 *
 * @param {object} model - El modelo de Sequelize para realizar la búsqueda.
 * @param {string} [by="id"] - El campo por el cual se realiza la búsqueda (por defecto es 'id').
 * @param {string} [location="param"] - El campo por el cual se realiza la búsqueda (por defecto es 'id').
 * @param {object} [options={}] - Opciones adicionales de búsqueda para Sequelize.
 *
 * @returns {function} Middleware de Express que busca el elemento y lo agrega a `req`.
 *
 * @example
 * // Buscar un producto por 'id' y agregarlo como req.product
 * app.get('/product/:id', findItem(Product), (req, res) => {
 *   res.json(req.product);
 * });
 *
 * @example
 * // Buscar una orden por 'orderNumber' en el cuerpo de la solicitud y agregarla como req.order
 * app.post('/order', findItem(Order, 'orderNumber'), (req, res) => {
 *   res.json(req.order);
 * });
 *
 * @example
 * // Buscar un carrito por 'cartId' y agregarlo como req.cart, con opciones personalizadas
 * app.get('/cart/:cartId', findItem(Cart, 'cartId', { include: [User] }), (req, res) => {
 *   res.json(req.cart);
 * });
 */
export const findItem =
  (model, by = "id", location = "param", options = {}) =>
  async (req, res, next) => {
    try {
      const { [by]: id } = req[location];

      if (!id) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: `${by} is required in ${location}.` });
      }
      const opts = {
        where: { [by]: id },
        ...options,
      };

      console.log("Where in clause", opts);

      const item = await model.findByPk(id, options);

      if (!item) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: `${model.name} no encontrado` });
      }

      req[model.name.toLowerCase()] = item;
      next();
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

/**
 * Middleware para buscar una orden en la base de datos utilizando Sequelize.
 *
 * Busca una orden por el campo 'id' y la agrega a `req.order`.
 *
 * @returns {function} Middleware de Express que busca la orden y la agrega a `req.order`.
 *
 * @example
 * // Buscar una orden por 'id' y agregarla como req.order
 * app.get('/order/:id', findOrder, (req, res) => {
 *   res.json(req.order);
 * });
 */
export const findOrder = findItem(Order);

/**
 * Middleware para buscar un carrito en la base de datos utilizando Sequelize.
 *
 * Busca un carrito por el campo 'cartId', incluyendo los productos asociados, y lo agrega a `req.cart`.
 *
 * @returns {function} Middleware de Express que busca el carrito y lo agrega a `req.cart`.
 *
 * @example
 * // Buscar un carrito por 'cartId' y agregarlo como req.cart, incluyendo productos
 * app.get('/cart/:cartId', findCart, (req, res) => {
 *   res.json(req.cart);
 * });
 */
export const findCartInBody = findItem(Cart, "cartId", "body", {
  include: [Product],
});
