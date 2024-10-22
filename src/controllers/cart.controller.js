import httpStatus from "http-status";
import { Op } from "sequelize";
import { Cart, CartItem, Product } from "../models/index.js";

export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const whereClause = id.includes('@') ? { email: id } : { id };
    const cart = await Cart.findOne({
      where: whereClause,
      include: [Product],
    });

    if (!cart) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Cart not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      cart,
    });

  } catch (error) {
    next(error);
  }
};


export const addProductToCart = async (req, res, next) => {
  const { productId, count, email } = req.body;
  const { id } = req.params || {};

  try {
    const whereClause = id ? { id } : { email };
    const [cart] = await Cart.findOrCreate({
      where: whereClause,
      include: [Product],
    });

    if (count === 0) {
      await CartItem.destroy({
        where: { CartId: cart.id, productId },
      });

      res.status(httpStatus.OK).json({
        success: true,
        data: `Product removed from cart`,
      });

      return;
    }

    const product = await Product.findOne({
      where: { id: productId, stock: { [Op.gt]: count } },
    });

    if (!product) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Product not found or not enough stock",
      });
      return;
    }

    await CartItem.create({ CartId: cart.id, ProductId: product.id, count });
    await cart.reload({ include: [Product] });

    res.status(httpStatus.OK).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};








