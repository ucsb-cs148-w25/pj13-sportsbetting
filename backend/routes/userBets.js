import express from "express";
import {
  getUserBets,
  getUserBetById,
  postUserBet,
  putUserBet,
  deleteUserBet,
} from "../controllers/userBetsController.js";

const router = express.Router();

// User Bet routes
router.get("/", getUserBets); // Get all user bets
router.get("/:id", getUserBetById); // Get a specific user bet by ID
router.post("/", postUserBet); // Create a new user bet
router.put("/:id", putUserBet); // Update a user bet by ID
router.delete("/:id", deleteUserBet); // Delete a user bet by ID

export default router;
