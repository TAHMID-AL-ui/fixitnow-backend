import { Router } from "express";
import {
  myProfile,
  updateProfile,
  allUsers,
  changeUserStatus,
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.js";


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


// Admin routes (role protection will be added next)
router.get(
  "/",
  authMiddleware,
  allUsers
);


router.patch(
  "/:id/status",
  authMiddleware,
  changeUserStatus
);


export default router;