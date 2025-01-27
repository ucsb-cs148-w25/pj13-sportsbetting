import { connectDB } from "../config/db.js";

// Initialize Firestore instance
const db = await connectDB();

// GET ALL GROUPS
export async function getGroups(req, res) {
  try {
    const groupsRef = db.collection("groups");
    const snapshot = await groupsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const groups = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error("Error getting groups: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// GET GROUP BY ID
export async function getGroupById(req, res) {
  try {
    const { id } = req.params; // Group ID from the route
    const groupRef = db.collection("groups").doc(id);
    const doc = await groupRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Error getting group by ID: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// CREATE NEW GROUP
export async function postGroup(req, res) {
  try {
    const { groupName, creatorId, memberIds, leaderboard } = req.body;
    // const id = req.params.id; // Group ID from the route

    // Validate required fields
    if (
      !groupName ||
      !creatorId ||
      !Array.isArray(memberIds) ||
      !Array.isArray(leaderboard) ||
      !leaderboard.every(
        (entry) =>
          typeof entry.userId === "string" && typeof entry.groupWinnings === "number"
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields: groupName (string), creatorId (string), memberIds (array of strings), leaderboard (array of objects with userId (string) and groupWinnings (number))",
      });
    }

    // Prepare the group data
    const newGroup = { groupName, creatorId, memberIds, leaderboard };

    // Create or overwrite the group document
    const groupsRef = db.collection("groups");
    const groupDoc = await groupsRef.add(newGroup); // Automatically generates an ID

    res.status(201).json({
      success: true,
      id: groupDoc.id,
      data: newGroup,
    });
  } catch (error) {
    console.error("Error creating group: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// UPDATE GROUP BY ID
export async function putGroup(req, res) {
  try {
    const { id } = req.params; // Group ID from the route
    const { groupName, creatorId, memberIds, leaderboard } = req.body;

    // Validate at least one field exists for update
    if (
      groupName === undefined &&
      creatorId === undefined &&
      memberIds === undefined &&
      leaderboard === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    // Prepare the fields for update
    const updatedData = {};
    if (groupName) updatedData.groupName = groupName;
    if (creatorId) updatedData.creatorId = creatorId;
    if (memberIds) {
      if (!Array.isArray(memberIds)) {
        return res.status(400).json({
          success: false,
          message: "memberIds must be an array of strings.",
        });
      }
      updatedData.memberIds = memberIds;
    }
    if (leaderboard) {
      if (
        !Array.isArray(leaderboard) ||
        !leaderboard.every(
          (entry) =>
            typeof entry.userId === "string" &&
            typeof entry.groupWinnings === "number"
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "leaderboard must be an array of objects with userId (string) and groupWinnings (number).",
        });
      }
      updatedData.leaderboard = leaderboard;
    }

    const groupRef = db.collection("groups").doc(id);
    const doc = await groupRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    await groupRef.update(updatedData);

    res.status(200).json({
      success: true,
      message: "Group updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating group: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// DELETE GROUP BY ID
export async function deleteGroup(req, res) {
  try {
    const { id } = req.params; // Group ID from the route

    const groupRef = db.collection("groups").doc(id);
    const doc = await groupRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    await groupRef.delete();

    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
