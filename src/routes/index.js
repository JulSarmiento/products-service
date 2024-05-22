import express from "express";
import httpStatus from "http-status";

import productsRouter from "./products.routes.js";

const router = express.Router();


router.get("/health", (_req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    status: "up",
    environment: process.env.ENVIRONMENT || "Not found",
  });
})
  .use("/products", productsRouter);


export default router;