import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";

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


// Global error handler (must be last middleware)
app.use(globalErrorHandler);


export default app;