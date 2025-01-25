import express from "express";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/:id", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
