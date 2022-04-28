import express from "express";
const router = express.Router();

// Routes files
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";

// Auth routes
router.use("/auth", AuthRoutes);

// User routes
router.use("/user", UserRoutes);

router.use("/*", (req, res, next) => {
  next({
    status: 404,
    message: "The page you're trying to access is not found!",
  });
});

export default router;
