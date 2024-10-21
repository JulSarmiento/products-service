import Joi from "joi";

// Product schema
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
  imageSrc: Joi.string().uri().required(),
  imageAlt: Joi.string().min(3).max(350).required(),
  active: Joi.boolean().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
  imageSrc: Joi.string().uri().optional(),
  imageAlt: Joi.string().min(3).max(350).optional(),
  active: Joi.boolean().optional(),
});

// Category schema
export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  active: Joi.boolean().required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  active: Joi.boolean().optional(),
});

// Subcategory schema
export const createSubcategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  active: Joi.boolean().required(),
});

export const updateSubcategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  active: Joi.boolean().optional(),
});

// Order schema
export const createOrderSchema = Joi.object({
  orderStatus: Joi.string()
    .valid(
      "Pending",
      "Payment Verified",
      "Processing",
      "Shipped",
      "Delivered",
      "cancelled"
    )
    .required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  email: Joi.string().email().required(),
  document: Joi.object({
    type: Joi.string().required(),
    number: Joi.string().required(),
  }).required(),
  phone: Joi.object({
    area: Joi.string().required(),
    number: Joi.string().required(),
  }).required(),
  paymentData: Joi.object({
    card: Joi.object({
      reference: Joi.string().required(),
      method: Joi.string().required(),
      shippingType: Joi.string().required(),
      shippingCost: Joi.number().required(),
      status: Joi.string().required().valid("pending", "approved", "declined"),
    }).required(),
    shippingAddress: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    }).required(),
    oderData: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().required(),
          })
        )
        .required(),
      total: Joi.number().required(),
    }).required(),
  }).required(),
});

export const updateOrderSchema = Joi.object({
  orderStatus: Joi.string()
    .valid("pending", "completed", "cancelled")
    .optional(),
  paymentData: Joi.object({
    card: Joi.object({
      reference: Joi.string().optional(),
      method: Joi.string().optional(),
      shippingType: Joi.string().optional(),
      shippingCost: Joi.number().optional(),
      status: Joi.string().optional().valid("pending", "approved", "declined"),
    }).optional(),
  }).optional(),
});

// Cart and CartItem Schema

export const createCartSchema = Joi.object({
  count: Joi.number().min(0).required(),
  productId: Joi.string().uuid().required(),
});

export const updateCartSchema = Joi.object({
  count: Joi.number().min(0).optional(),
  productId: Joi.string().uuid().required(),
});