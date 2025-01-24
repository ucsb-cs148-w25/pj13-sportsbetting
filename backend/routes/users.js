import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/:id", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
