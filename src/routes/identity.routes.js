import express from "express";
import {
  getIdentities,
  getIdentityById,
  createIdentity,
  updateIdentity,
  deleteIdentity,
} from "../controllers/index.js";
import {
  advanceSearch,
  validatedCreateIdentity,
  validateUpdateIdentity,
} from "../middlewares/index.js";

const router = express.Router();

router.get("/",[advanceSearch()], getIdentities);
router.get("/:id", getIdentityById);
router.post("/", [validatedCreateIdentity], createIdentity);
router.patch("/:id", [validateUpdateIdentity], updateIdentity);
router.delete("/:id", deleteIdentity);

export default router;
