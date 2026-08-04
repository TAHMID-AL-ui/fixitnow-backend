import app from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = 5000;

async function startServer() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`FixItNow server running on port ${PORT}`);
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();