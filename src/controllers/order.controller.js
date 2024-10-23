import httpStatus from "http-status";
import { Order, Product } from "../models/index.js";

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count: totalItems } = await Order.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.status(httpStatus.OK).json({
      success: true,
      rows,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { order } = req;

    res.status(httpStatus.OK).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const { cartId, status, name, email, document, phone, payment, shipping } =
    req.body;

  try {
    const { cart } = req;

    let total = 0;

    // Productos a actualizar
    const products = [];

    // Procesa los productos
    const items = cart.Products.map(
      ({ id: productId, CartItem: { count: quantity }, price, stock }) => {
        // Calcular el total a pagar
        total + price * quantity;

        // Actualización de inventario
        products.push({ id, stock: stock - count });

        // Retorno mapeado para orden
        return {
          productId,
          quantity,
          price,
        };
      }
    );

    const order = await Order.create({
      status,
      name,
      email,
      document,
      phone,
      payment,
      shipping,
      items: {
        products: items,
        total,
      },
      total: total + shipping.cost,
    });

    // Actualiza el inventario de los productos
    Product.bulkCreate(bulkUpdate, { updateOnDuplicate: ["id"] });

    // Eliminar carrito e items del carrito en cascada
    await cart.destroy();

    console.log(`Eliminado carrito (${cartId}) e items del carrito en cascada`);

    res.status(httpStatus.CREATED).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { order } = req;

    order.set(req.body);

    await jane.save();

    res.status(httpStatus.OK).json({
      success: true,
      data: "Order updated",
    });
  } catch (error) {
    next(error);
  }
};
