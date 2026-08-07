import { Router } from "express";

import {
  create,
  getByBooking,
  updateStatus,
  history,
  details,
} from "./payment.controller.js";


import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();



router.post(
  "/",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  create
);



router.get(
  "/",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  history
);



// Payment details by payment id

router.get(
  "/details/:id",
  authMiddleware,
  details
);



// Existing route kept

router.get(
  "/:bookingId",
  authMiddleware,
  getByBooking
);



router.patch(
  "/:bookingId/status",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  updateStatus
);



export default router;