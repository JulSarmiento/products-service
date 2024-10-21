import httpStatus from "http-status";
import { Op } from "sequelize";
import { Cart, CartItem, Product } from "../models/index.js";

export const getCartById = async (req, res, next) => {
  try {

    const { id } = req.params;
    const cart = await Cart.findByPk(id, {
      include: [Product],
    });

    if (!cart) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Cart not found",
      });
    };

    res.status(httpStatus.OK).json({
      success: true,
      cart,
    });

  } catch (error) {
    next(error);
  };
};

export const addProductToCart = async (req, res, next) => {
  const { id } = req.params;
  const { productId, count } = req.body;

  try {
    const [ cart ] = await Cart.findOrCreate({
      where: id,
      include: [Product]
    });

    if (count === 0) {
      CartItem.destroy({
        where: { cartId: cart.id, productId },
      });

      res.status(httpStatus.OK).json({
        success: true,
        data: `Product removed from cart`,
      });

      const product = await Product.findOne({
        where: {id: productId, stock : { [Op.gt]: count}}, 
      });


      if (!product) {
        res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Product not found or not enough stock",
        });
        return;
      };

      await cart.addProduct(product, { through: { count } });
      await cart.reload();

      res.status(httpStatus.OK).json({
        success: true,
        data: cart,
      });

      return;
    }
  } catch (error) {
    next(error);
  };
};








