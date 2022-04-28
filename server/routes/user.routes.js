import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import UserController from "../controllers/user.controller";
const router = express.Router();
const UserValidator = require("../validators/user.validator");

router.get("/", [adminAuthMiddleware], UserController.listUsers);
router.get("/all", [adminAuthMiddleware], UserController.listAllUsers);
router.get("/:id", [authMiddleware], UserController.getUserDetail);
router.post(
  "/",
  [adminAuthMiddleware, UserValidator.create()],
  UserController.createUser
);
router.patch(
  "/:id",
  [authMiddleware, UserValidator.update()],
  UserController.updateUser
);
router.delete("/:id", [adminAuthMiddleware], UserController.deleteUser);
router.get("/search/:q", [adminAuthMiddleware], UserController.searchUser);

export default router;
