import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import serviceRoutes from "./modules/service/service.routes.js";
import technicianRoutes from "./modules/technician/technician.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";

import globalErrorHandler from "./middleware/global-error.js";


const app = express();


app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("FixItNow API is running");
});



// Authentication routes
app.use(
  "/api/auth",
  authRoutes
);



// User routes
app.use(
  "/api/users",
  userRoutes
);



// Category routes
app.use(
  "/api/categories",
  categoryRoutes
);



// Service routes
app.use(
  "/api/services",
  serviceRoutes
);



// Technician routes
app.use(
  "/api/technicians",
  technicianRoutes
);



// Booking routes
app.use(
  "/api/bookings",
  bookingRoutes
);



// Payment routes
app.use(
  "/api/payments",
  paymentRoutes
);



// Global error handler (must be last middleware)
app.use(globalErrorHandler);


export default app;