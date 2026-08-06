import { Router } from "express";

import {
  create,
  myBookings,
  technicianBookings,
  updateStatus,
  cancel,
} from "./booking.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();



// Customer routes

router.post(
  "/",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  create
);


router.get(
  "/my",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  myBookings
);


router.patch(
  "/:id/cancel",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  cancel
);





// Technician routes

router.get(
  "/technician",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  technicianBookings
);


router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRole("TECHNICIAN"),
  updateStatus
);



export default router;