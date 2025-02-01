import express from "express";
import {
  getGroups,
  getGroupById,
  postGroup,
  putGroup,
  deleteGroup,
  deleteUserFromGroup,
} from "../controllers/groupsController.js";

const router = express.Router();

// Group routes
router.get("/", getGroups); // Get all groups
router.get("/:id", getGroupById); // Get a specific group by ID
router.post("/", postGroup); // Create a new group
router.put("/:id", putGroup); // Update a group by ID
router.delete("/:id", deleteGroup); // Delete a group by ID
router.delete("/:groupId/users/:userId", deleteUserFromGroup); // Delete a user from a group

export default router;
