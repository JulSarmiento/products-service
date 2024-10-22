import httpStatus from "http-status";
import { Order, Product, Cart, CartItem } from "../models/index.js";

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const {rows, count: totalItems} = await Order.findAndCountAll({
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
      order,
    });

  } catch (error) {
    next(error);
  };
};

export const createOrder = async (req, res, next) => {
  
  const { cartId, status, name, email, document, phone, payment, shipping } = req.body;

  try {
    console.log("Body", req.body); 
    console.log("CartId", req.body.cartId);
    const cart = await Cart.findByPk(cartId, {
      include: [Product],
    });
    console.log("Cart", cart);

    if (!cart) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Cart not found",
      });
    }

    // Crear la orden
    const items = cart.Products.map(product => ({
      productId: product.id,
      quantity: product.CartItem.count,
      price: product.price,
    }));

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
        total: items.reduce((total, item) => total + item.price * item.quantity, 0),
      },
      total: items.reduce((total, item) => total + item.price * item.quantity, 0) + shipping.cost,
    });

    // Actualizar el stock de los productos
    await Promise.all(
      cart.Products.map(async product => {
        const productInstance = await Product.findByPk(product.id);
        productInstance.stock -= product.CartItem.count;
        return productInstance.save();
      })
    );

    // Eliminar los ítems del carrito
    await CartItem.destroy({
      where: { cartId },
    });

    res.status(httpStatus.CREATED).json({
      success: true,
      order,
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