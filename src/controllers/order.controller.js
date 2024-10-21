import httpStatus from "http-status";
import { Order, Product, Cart, CartItem } from "../models/index.js";

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const orders = await Order.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.status(httpStatus.OK).json({
      success: true,
      data: orders,
      totalItems: orders.count,
      totalPages: Math.ceil(orders.count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  };
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [Product],
    });

    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Order not found",
      });
    };

    res.status(httpStatus.OK).json({
      success: true,
      data: order,
    });

  } catch (error) {
    next(error);
  };
};

export const createOrder = async (req, res, next) => {
  const { cartId } = req.params;
  const { name, email, document, phone, payment, shippingAddress, shipping  } = req.body;

  try {
    const cart = await Cart.findByPk(cartId, {
      include: [Product],
    });

    if (!cart) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Cart not found",
      });
    };

    const order = await Order.create({
      name,
      email,
      document,
      phone,
      payment,
      shippingAddress,
      shipping,
    });

    await Promise.all(
      cart.products.map(async ({ id, cartItem }) => {
        const product = await Product.findByPk(id);
        product.stock -= cartItem.count;
        return product.save();
      })
    );
    
    await CartItem.destroy({
      where: { cartId },
    });

    res.status(httpStatus.CREATED).json({
      success: true,
      data: order,
    });

  } catch (error) {
    next(error);
  }

};

export const updateOrder = async (req, res, next) => {
  try {

    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Order not found",
      });
    };

    await Order.update(req.body, {
      where: { id },
    });

    res.status(httpStatus.OK).json({
      success: true,
      data: "Order updated",
    });

  } catch (error) {
    next(error);
  }
};