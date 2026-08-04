import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test API route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FixItNow API is running",
  });
});


export default app;