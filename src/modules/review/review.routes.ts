import { Router } from "express";

import {
  create,
  getByTechnician,
} from "./review.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/role.js";


const router = Router();



// Customer creates review

router.post(
  "/",
  authMiddleware,
  authorizeRole("CUSTOMER"),
  create
);



// Anyone authenticated can view technician reviews

router.get(
  "/technician/:technicianId",
  authMiddleware,
  getByTechnician
);



export default router;