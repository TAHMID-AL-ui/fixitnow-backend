import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./service.controller.js";

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


// Technician routes

router.post(
  "/",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  create
);


router.patch(
  "/:id",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  update
);


router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  remove
);


export default router;