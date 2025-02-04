import express from "express";
import {
  getBets,
  getBetById,
  postBet,
  putBet,
  deleteBet,
  getBetByBetId
} from "../controllers/betsController.js";

const router = express.Router();

// Bet routes
router.get("/", getBets); // Get all bets
router.get("/:id", getBetById); // Get a specific bet by ID
router.post("/", postBet); // Create a new bet
router.put("/:id", putBet); // Update a bet by ID
router.delete("/:id", deleteBet); // Delete a bet by ID
router.get("/bet_id/:bet_id", getBetByBetId); // Get a specific bet by bet ID

export default router;
