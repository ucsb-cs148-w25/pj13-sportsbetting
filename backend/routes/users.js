import express from "express";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  awardUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/:id", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);
router.patch("/:id/balance", awardUser);

export default router;
