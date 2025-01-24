import express from "express";
import {
  getGroup,
  getGroupById,
  postGroup,
  putGroup,
  deleteGroup,
} from "../controllers/groupsController.js";

const router = express.Router();

// Group routes
router.get("/", getGroup); // Get all groups
router.get("/:id", getGroupById); // Get a specific group by ID
router.post("/", postGroup); // Create a new group
router.put("/:id", putGroup); // Update a group by ID
router.delete("/:id", deleteGroup); // Delete a group by ID

export default router;
