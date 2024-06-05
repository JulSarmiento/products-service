import express from "express";
import httpStatus from "http-status";
import productsRouter from "./products.routes.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  const healthy = !!process.env.POSTGRESQL_URL && !!process.env.POSTGRESQL_SSL_CA;

  res.status(httpStatus.OK).json({
    success: true,
    status: "up",
    environment: process.env.ENVIRONMENT || "Not found",
    healthy
  });
})
  .use("/products", productsRouter);


export default router;