import { Router, Request, Response } from "express";

const router = Router();

// Health check route
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Import and use other route modules here
// Example:
// import userRoutes from "./users";
// import authRoutes from "./auth";
// import searchRoutes from "./search";

// Use imported routes
// router.use("/users", userRoutes);
// router.use("/auth", authRoutes);
// router.use("/search", searchRoutes);

// Catch-all route for undefined endpoints
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

export default router;
