import express from "express";
import httpStatus from "http-status";
import envVariables from "../utils/env.config.js";
import productsRouter from "./products.routes.js";
import categoriesRouter from "./category.routes.js";
import subCategoriesRouter from "./subcategories.routes.js";
import cartRouter from "./cat.routes.js";
import orderRouter from "./order.routes.js"

const { POSTGRESQL_URL, POSTGRESQL_SSL_CA, ENVIRONMENT } = envVariables;
const router = express.Router();

router.get("/health", (_req, res) => {
  const healthy = !!POSTGRESQL_URL && !!POSTGRESQL_SSL_CA;

  res.status(httpStatus.OK).json({
    success: true,
    status: "up",
    environment: ENVIRONMENT || "Not found",
    healthy
  });
})
  .use("/products", productsRouter)
  .use("/categories", categoriesRouter)
  .use("/subcategories", subCategoriesRouter)
  .use("/cart", cartRouter)
  .use("/orders", orderRouter);


export default router;