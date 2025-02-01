import * as groupService from "../services/groupService.js";
import {checkToken} from '../services/tokenAuth.js'

// GET ALL GROUPS
export async function getGroups(req, res) {
  try {
    checkToken(req);
    const groups = await groupService.getAllGroups();
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error("Error getting groups: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET GROUP BY ID
export async function getGroupById(req, res) {
  try {
    checkToken(req);
    const group = await groupService.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
    res.status(200).json({ success: true, data: group });
  } catch (error) {
    console.error("Error getting group by ID: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// CREATE NEW GROUP
export async function postGroup(req, res) {
  try {
    checkToken(req);
    const { groupName, creatorId, memberIds, leaderboard } = req.body;
    if (!groupName || !creatorId || !Array.isArray(memberIds) || !Array.isArray(leaderboard)) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const newGroup = await groupService.createGroup({ groupName, creatorId, memberIds, leaderboard });
    res.status(201).json({ success: true, id: newGroup.id, data: newGroup });
  } catch (error) {
    console.error("Error creating group: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// UPDATE GROUP
export async function putGroup(req, res) {
  try {
    checkToken(req);
    const { id } = req.params;
    const { groupName, creatorId, memberIds, leaderboard, joinUserId } = req.body;

    // Build update object
    const updateFields = {};
    if (groupName) updateFields.groupName = groupName;
    if (creatorId) updateFields.creatorId = creatorId;
    if (memberIds) updateFields.memberIds = memberIds;
    if (leaderboard) updateFields.leaderboard = leaderboard;

    const updatedGroup = await groupService.updateGroup(id, updateFields, joinUserId);

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({
      success: true,
      message: joinUserId ? "User joined the group successfully" : "Group updated successfully",
      data: updatedGroup
    });

  } catch (error) {
    console.error("Error updating group: ", error.message);
    res.status(400).json({ success: false, message: error.message || error.message });
  }
}

// DELETE GROUP
export async function deleteGroup(req, res) {
  try {
    checkToken(req);
    const success = await groupService.deleteGroup(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Delete a user from a group
export async function deleteUserFromGroup(req, res) {
  try {
    checkToken(req);
    const { groupId, userId } = req.params;
    const success = await groupService.deleteUserFromGroup(groupId, userId);
    if (!success) {
      return res.status(404).json({ success: false, message: "Group or user not found" });
    }
    res.status(200).json({ success: true, message: "User deleted from group successfully" });
  } catch (error) {
    console.error("Error deleting user from group: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}