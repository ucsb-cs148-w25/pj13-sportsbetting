import { connectDB } from "../config/db.js";
import {checkToken} from '../services/tokenAuth.js'

// Initialize Firestore instance
const db = await connectDB();

// GET ALL USER BETS
export async function getUserBets(req, res) {
  try {
    checkToken(req);
    const userBetsRef = db.collection("userBets");
    const snapshot = await userBetsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const userBets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: userBets });
  } catch (error) {
    console.error("Error getting user bets: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET USER BET BY ID
export async function getUserBetById(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User Bet ID from the route
    const userBetRef = db.collection("userBets").doc(id);
    const doc = await userBetRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User bet not found" });
    }

    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Error getting user bet by ID: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// CREATE NEW USER BET
export async function postUserBet(req, res) {
  try {
    checkToken(req);
    const { userId, betId, teamChosen, amount, potentialWinnings, status } = req.body;
    const id = req.params.id; // User Bet ID from the route

    // Validate required fields
    if (
      !userId ||
      !betId ||
      !["team1", "team2"].includes(teamChosen) ||
      typeof amount !== "number" ||
      typeof potentialWinnings !== "number" ||
      !["pending", "won", "lost"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields: userId (string), betId (string), teamChosen (team1 or team2), amount (number), potentialWinnings (number), status (pending, won, lost)",
      });
    }

    // Prepare the user bet data
    const newUserBet = { userId, betId, teamChosen, amount, potentialWinnings, status };

    // Create or overwrite the user bet document
    const userBetRef = db.collection("userBets").doc(id);
    await userBetRef.set(newUserBet);

    res.status(201).json({
      success: true,
      id: id,
      data: newUserBet,
    });
  } catch (error) {
    console.error("Error creating user bet: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// UPDATE USER BET BY ID
export async function putUserBet(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User Bet ID from the route
    const { userId, betId, teamChosen, amount, potentialWinnings, status } = req.body;

    // Validate at least one field exists for update
    if (
      userId === undefined &&
      betId === undefined &&
      teamChosen === undefined &&
      amount === undefined &&
      potentialWinnings === undefined &&
      status === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    // Prepare the fields for update
    const updatedData = {};
    if (userId) updatedData.userId = userId;
    if (betId) updatedData.betId = betId;
    if (teamChosen) {
      if (!["team1", "team2"].includes(teamChosen)) {
        return res.status(400).json({
          success: false,
          message: "teamChosen must be either team1 or team2.",
        });
      }
      updatedData.teamChosen = teamChosen;
    }
    if (amount !== undefined) updatedData.amount = amount;
    if (potentialWinnings !== undefined) updatedData.potentialWinnings = potentialWinnings;
    if (status) {
      if (!["pending", "won", "lost"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "status must be pending, won, or lost.",
        });
      }
      updatedData.status = status;
    }

    const userBetRef = db.collection("userBets").doc(id);
    const doc = await userBetRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User bet not found" });
    }

    await userBetRef.update(updatedData);

    res.status(200).json({
      success: true,
      message: "User bet updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating user bet: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// DELETE USER BET BY ID
export async function deleteUserBet(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User Bet ID from the route

    const userBetRef = db.collection("userBets").doc(id);
    const doc = await userBetRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User bet not found" });
    }

    await userBetRef.delete();

    res.status(200).json({ success: true, message: "User bet deleted successfully" });
  } catch (error) {
    console.error("Error deleting user bet: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET ALL USERS BY BET ID
export async function getUsersThatBetOnBetId(req, res) {
  try {
    checkToken(req);
    const { bet_id } = req.params; // Bet ID from the route
    const userBetsRef = db.collection("userBets").where("betId", "==", bet_id);
    const snapshot = await userBetsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error getting users by bet_id: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// helper func
export async function updateStatus(userBetId, status) {
  const userBetRef = db.collection("userBets").doc(userBetId);
  await userBetRef.update({ status });
}
