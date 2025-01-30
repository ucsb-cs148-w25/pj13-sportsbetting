import { connectDB } from "../config/db.js";

// Initialize Firestore instance
const db = await connectDB();

// GET ALL BETS
export async function getBets(req, res) {
  try {
    const betsRef = db.collection("bets");
    const snapshot = await betsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const bets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: bets });
  } catch (error) {
    console.error("Error getting bets: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// GET BET BY ID
export async function getBetById(req, res) {
  try {
    const { id } = req.params; // Bet ID from the route
    const betRef = db.collection("bets").doc(id);
    const doc = await betRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Bet not found" });
    }

    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Error getting bet by ID: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// CREATE NEW BET
export async function postBet(req, res) {
  try {
    const { bet_id, team1, team2, startTime, endTime, winner, betStatus, team1_price, team2_price } = req.body;
    const id = req.params.id || db.collection("bets").doc().id; // Bet ID from the route or generate a new one

    // Validate required fields
    if (
      !bet_id ||
      !team1 ||
      !team2 ||
      !startTime ||
      !endTime ||
      !["team1", "team2", null].includes(winner) ||
      !["open", "closed", "completed"].includes(betStatus) ||
      !team1_price ||
      !team2_price
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields: bet_id (string), team1 (string), team2 (string), startTime (timestamp), endTime (timestamp), winner (team1, team2, or null), betStatus (open, closed, completed), team1_price (double), team2_price (double).",
      });
    }

    // Check if bet_id already exists
    const existingBetSnapshot = await db.collection("bets").where("bet_id", "==", bet_id).get();
    if (!existingBetSnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: "Bet with this bet_id already exists.",
      });
    }

    // Prepare the bet data
    const newBet = { bet_id, team1, team2, startTime, endTime, winner, betStatus, team1_price, team2_price };

    // Create the bet document
    const betRef = db.collection("bets").doc(id);
    await betRef.set(newBet);

    res.status(201).json({
      success: true,
      id: id,
      data: newBet,
    });
  } catch (error) {
    console.error("Error creating bet: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// UPDATE BET BY ID
export async function putBet(req, res) {
  try {
    const { id } = req.params; // Bet ID from the route
    const { team1, team2, startTime, endTime, winner, betStatus } = req.body;

    // Validate at least one field exists for update
    if (
      team1 === undefined &&
      team2 === undefined &&
      startTime === undefined &&
      endTime === undefined &&
      winner === undefined &&
      betStatus === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    // Prepare the fields for update
    const updatedData = {};
    if (team1) updatedData.team1 = team1;
    if (team2) updatedData.team2 = team2;
    if (startTime) updatedData.startTime = startTime;
    if (endTime) updatedData.endTime = endTime;
    if (winner) updatedData.winner = winner;

    if (betStatus) {
      if (!["open", "closed", "completed"].includes(betStatus)) {
        return res.status(400).json({
          success: false,
          message: "BetStatus must be open, closed, or completed.",
        });
      }
      updatedData.betStatus = betStatus;
    }

     // Query the bets collection for the document with the given bet_id
     const betsRef = db.collection("bets").where("bet_id", "==", id);
     const snapshot = await betsRef.get();

     if (snapshot.empty) {
       return res.status(404).json({ success: false, message: "Bet not found" });
     }

     // Assuming bet_id is unique, we take the first document
     const doc = snapshot.docs[0];
     const betRef = doc.ref;

    await betRef.update(updatedData);

    res.status(200).json({
      success: true,
      message: "Bet updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating bet: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// DELETE BET BY ID
export async function deleteBet(req, res) {
  try {
    const { id } = req.params; // Bet ID from the route

    const betRef = db.collection("bets").doc(id);
    const doc = await betRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Bet not found" });
    }

    await betRef.delete();

    res.status(200).json({ success: true, message: "Bet deleted successfully" });
  } catch (error) {
    console.error("Error deleting bet: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
