import { connectDB } from "../config/db.js";
import {checkToken} from '../services/tokenAuth.js'
import { updateStatus } from "./userBetsController.js";

// Initialize Firestore instance
const db = await connectDB();

// GET ALL USERS
export async function getUsers(req, res) {
  try {
    checkToken(req);
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error getting users: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET USER BY ID
export async function getUserById(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User ID from the route
    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Error getting user by ID: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// CREATE NEW USER
export async function postUser(req, res) {
  try {
    checkToken(req);
    const { username, email, balance, totalWinnings, groupIds } = req.body;
    const id = req.params.id; // User ID from the route

    // Validate required fields
    if (
      !username ||
      !email ||
      typeof balance !== "number" ||
      typeof totalWinnings !== "number" ||
      !Array.isArray(groupIds)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields: username (string), email (string), balance (number), totalWinnings (number), groupIds (array of strings)",
      });
    }

    // Prepare the user data
    const newUser = { username, email, balance, totalWinnings, groupIds };

    // Create or overwrite the user document
    const userRef = db.collection("users").doc(id);
    await userRef.set(newUser);

    res.status(201).json({
      success: true,
      id: id,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// UPDATE USER BY ID
export async function putUser(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User ID from the route
    const { username, email, balance, totalWinnings, groupIds } = req.body;

    // Validate at least one field exists for update
    if (
      username === undefined &&
      email === undefined &&
      balance === undefined &&
      totalWinnings === undefined &&
      groupIds === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    // Prepare the fields for update
    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (balance !== undefined) updatedData.balance = balance;
    if (totalWinnings !== undefined) updatedData.totalWinnings = totalWinnings;
    if (groupIds) {
      if (!Array.isArray(groupIds)) {
        return res.status(400).json({
          success: false,
          message: "groupIds must be an array of strings.",
        });
      }
      updatedData.groupIds = groupIds;
    }

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await userRef.update(updatedData);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating user: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// DELETE USER BY ID
export async function deleteUser(req, res) {
  try {
    checkToken(req);
    const { id } = req.params; // User ID from the route

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await userRef.delete();

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// UPDATE USER BALANCE AND TOTAL WINNINGS
export async function awardUser(req, res) {
  try {
    checkToken(req);
    const { id } = req.params;
    const { amount, userBetId } = req.body;

    const userRef = db.collection("users").doc(id);

    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);

      if (!doc.exists) {
        throw new Error("User not found");
      }

      const userData = doc.data();
      const newBalance = (userData.balance || 0) + amount;
      const newTotalWinnings = (userData.totalWinnings || 0) + amount;

      transaction.update(userRef, {
        balance: newBalance,
        totalWinnings: newTotalWinnings,
      });
    });

    let status = amount === 0 ? "lost" : "won";
    await updateStatus(userBetId, status);

    res.status(200).json({
      success: true,
      message: "User balance and total winnings updated successfully",
    });
  } catch (error) {
    console.error("Error updating user balance: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}