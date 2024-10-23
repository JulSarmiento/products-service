import httpStatus from "http-status";
import { Op } from "sequelize";
import { Cart, CartItem, Product } from "../models/index.js";

export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({
      where: id.includes("@") ? { email: id } : { id },
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
  const { id } = req.params;

  try {
    const [cart, created] = await Cart.findOrCreate({
      where: {
        [Op.or]: [{ id }, { email: id || email }],
      },
      include: [Product],
      defaults: {
        email,
      },
    });

    if (count === 0) {
      await cart.removeProduct(Product.findByPk(productId));

      return res.status(httpStatus.OK).json({
        success: true,
        data: `Product removed from cart`,
      });
    }
    const product = await Product.findOne({
      where: {
      id: productId,
      },
    });

    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Product not found",
      });
    }

    if (product.stock < count) {
      return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Not enough stock",
      });
    }

    

    await cart.addProduct(product, { through: { count } });
    await cart.reload();

    res.status(httpStatus.OK).json({
      created,
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
