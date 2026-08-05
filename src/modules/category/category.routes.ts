import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./category.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();


// Public routes

router.get(
  "/",
  getAll
);


router.get(
  "/:id",
  getOne
);


// Admin routes

router.post(
  "/",
  authMiddleware,
  authorizeRole("ADMIN"),
  create
);


router.patch(
  "/:id",
  authMiddleware,
  authorizeRole("ADMIN"),
  update
);


router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("ADMIN"),
  remove
);


export default router;