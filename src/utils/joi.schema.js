import Joi from "joi";

// Product schema
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(350).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
  imageSrc: Joi.string().uri().required(),
  imageAlt: Joi.string().min(3).max(1000).required(),
  active: Joi.boolean().optional(),
  colors: Joi.object().required(),
  sizes: Joi.array().items(Joi.string()).required(),
  description: Joi.string().min(3).max(1000).required(),
  highlights: Joi.object().required(),
  details: Joi.string().min(3).max(1000).optional(),
  subcategoryId: Joi.string().uuid().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(350).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
  imageSrc: Joi.string().uri().optional(),
  imageAlt: Joi.string().min(3).max(1000).optional(),
  active: Joi.boolean().optional(),
  colors: Joi.object().optional(),
  sizes: Joi.object().optional(),
  description: Joi.string().min(3).max(1000).optional(),
  highlights: Joi.object().optional(),
  details: Joi.string().min(3).max(1000).optional(),
  subcategoryId: Joi.string().uuid().optional(),
});

// Category schema
export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(350).required(),
  description: Joi.string().min(3).max(1000).required(),
  imageSrc: Joi.string().uri().required(),
  imageAlt: Joi.string().min(3).max(1000).required(),
  active: Joi.boolean().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(350).optional(),
  description: Joi.string().min(3).max(1000).optional(),
  imageSrc: Joi.string().uri().optional(),
  imageAlt: Joi.string().min(3).max(1000).optional(),
  active: Joi.boolean().optional(),
});

// Subcategory schema
export const createSubcategorySchema = Joi.object({
  name: Joi.string().min(3).max(350).required(),
  categoryId: Joi.string().uuid().required(),
  active: Joi.boolean().optional(),
});

export const updateSubcategorySchema = Joi.object({
  name: Joi.string().min(3).max(350).optional(),
  categoryId: Joi.string().uuid().optional(),
  active: Joi.boolean().optional(),
});

// Order schema
export const createOrderSchema = Joi.object({
  cartId: Joi.string().uuid().required(),
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
    shipping: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    }).required(),
  }).required(),
});

export const updateOrderSchema = Joi.object({
  cartId: Joi.string().uuid().optional(),
  orderStatus: Joi.string()
    .valid(
      "Pending",
      "Payment Verified",
      "Processing",
      "Shipped",
      "Delivered",
      "cancelled")
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
  email: Joi.string().email().required(),
  count: Joi.number().min(0).required(),
  productId: Joi.string().uuid().required(),
});

export const updateCartSchema = Joi.object({
  email: Joi.string().email().optional(),
  count: Joi.number().min(0).optional(),
  productId: Joi.string().uuid().required(),
});

export const createIdentitySchema = Joi.object({
  companyName: Joi.string().required(),
  header: Joi.object({
    companyName: Joi.string().required(),
    firstLink: Joi.string().required(),
    secondLink: Joi.string().required(),
    thirdLink: Joi.string().required(),
    seeAll: Joi.string().required(),
    seeAllDescription: Joi.string().required(),
    logoAlt: Joi.string().required(),
    logoSrc: Joi.string().required(),
  }).required(),
  hero: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    buttonText: Joi.string().required(),
    slug: Joi.string().required(),
    imageSrc: Joi.string().required(),
    imageAlt: Joi.string().required(),
  }).required(),
  categories: Joi.object({
    title: Joi.string().required(),
  }).required(),
  banner: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    buttonText: Joi.string().required(),
    slug: Joi.string().required(),
    imageSrc: Joi.string().required(),
    imageAlt: Joi.string().required(),
  }).required(),
  testimonial: Joi.object({
    logoSrc: Joi.string().required(),
    quote: Joi.string().required(),
    authorImageSrc: Joi.string().required(),
    authorName: Joi.string().required(),
    authorRole: Joi.string().required(),
  }).required(),
  colors: Joi.object().required(),
});

export const updateIdentitySchema = Joi.object({
  companyName: Joi.string().optional(),
  header: Joi.object({
    companyName: Joi.string().optional(),
    firstLink: Joi.string().optional(),
    secondLink: Joi.string().optional(),
    thirdLink: Joi.string().optional(),
    seeAll: Joi.string().optional(),
    seeAllDescription: Joi.string().optional(),
    logoAlt: Joi.string().optional(),
    logoSrc: Joi.string().optional(),
  }).optional(),
  hero: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    buttonText: Joi.string().optional(),
    slug: Joi.string().optional(),
    imageSrc: Joi.string().optional(),
    imageAlt: Joi.string().optional(),
  }).optional(),
  categories: Joi.object({
    title: Joi.string().optional(),
  }).optional(),
  banner: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    buttonText: Joi.string().optional(),
    slug: Joi.string().optional(),
    imageSrc: Joi.string().optional(),
    imageAlt: Joi.string().optional(),
  }).optional(),
  testimonial: Joi.object({
    logoSrc: Joi.string().optional(),
    quote: Joi.string().optional(),
    authorImageSrc: Joi.string().optional(),
    authorName: Joi.string().optional(),
    authorRole: Joi.string().optional(),
  }).optional(),
  colors: Joi.object().optional(),
});