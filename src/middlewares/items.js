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
export const findItem = (model, by = "id", options = {}) => {
  return async (req, res, next) => {
    try {
      const { [by]: searchValue } = {
        ...req.params,
        ...req.query,
        ...req.body,
      };

      if (!searchValue) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: `${by} is required.` });
      }

      const item = await model.findOne({
        where: { [by]: searchValue },
        ...options,
      });

      if (!item) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: `${by}: ${searchValue} no encontrado` });
      }

      console.log("Returning", model.constructor.name, item.toJSON());
      req[model.constructor.name.toLowerCase()] = item;
      next();
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
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
export const findCart = findItem(Cart, "cartId", { include: [Product] });
