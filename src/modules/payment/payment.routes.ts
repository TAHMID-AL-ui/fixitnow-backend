import { Router } from "express";

import {
  create,
  getByBooking,
  updateStatus,
} from "./payment.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();



// Customer creates payment

router.post(
  "/",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  create
);



// Get payment details

router.get(
  "/:bookingId",
  authMiddleware,
  getByBooking
);



// Update payment status

router.patch(
  "/:bookingId/status",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  updateStatus
);



export default router;