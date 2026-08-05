import { Router } from "express";

import {
  myProfile,
  updateProfile,
  allUsers,
  changeUserStatus,
} from "./user.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();


// Logged-in user routes

router.get(
  "/profile",
  authMiddleware,
  myProfile
);


router.patch(
  "/profile",
  authMiddleware,
  updateProfile
);


// Admin-only routes

router.get(
  "/",
  authMiddleware,
  authorizeRole("ADMIN"),
  allUsers
);


router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRole("ADMIN"),
  changeUserStatus
);


export default router;