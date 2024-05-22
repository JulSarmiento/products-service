import express from "express";
import httpStatus from "http-status";


const router = express.Router();


router.get("/health", (_req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    status: "up",
    environment: process.env.ENVIRONMENT || "Not found",
  });
})


export default router;