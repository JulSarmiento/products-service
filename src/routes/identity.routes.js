import express from "express";
import {
  getIdentity
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getIdentity);

export default router;
