import { Router } from "express";

import {
  create,
  myProfile,
  update,
  getAll,
} from "./technician.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();


// Public route
router.get(
  "/",
  getAll
);



// Technician-only routes

router.post(
  "/profile",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  create
);


router.get(
  "/profile",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  myProfile
);


router.patch(
  "/profile",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  update
);


export default router;