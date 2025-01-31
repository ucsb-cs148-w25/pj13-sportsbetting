import { connectDB } from "../config/db.js";

const db = await connectDB();
const groupsRef = db.collection("groups");

export async function getAllGroups() {
    const snapshot = await groupsRef.get();
    return snapshot.empty ? [] : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getGroupById(id) {
    const doc = await groupsRef.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function createGroup(groupData) {
    const newGroupRef = await groupsRef.add(groupData);
    return { id: newGroupRef.id, ...groupData };
}

export async function updateGroup(id, updateFields, joinUserId) {
    const groupRef = groupsRef.doc(id);
    const doc = await groupRef.get();

    if (!doc.exists) return null;

    let updatedData = doc.data();

    // Handle adding a new user to memberIds
    if (joinUserId) {
        if (!updatedData.memberIds.includes(joinUserId)) {
            updatedData.memberIds.push(joinUserId);
        } else {
            throw new Error("User already in the group");
        }
    }

    // Merge new data
    const finalUpdate = { ...updateFields, memberIds: updatedData.memberIds };

    await groupRef.update(finalUpdate);
    return { id, ...finalUpdate };
}

export async function deleteGroup(id) {
    const groupRef = groupsRef.doc(id);
    const doc = await groupRef.get();
    if (!doc.exists) return null;

    await groupRef.delete();
    return true;
}

// delete a user from a group
export async function deleteUserFromGroup(groupId, userId) {
    const groupRef = groupsRef.doc(groupId);
    const doc = await groupRef.get();
    if (!doc.exists) return null;

    const updatedData = doc.data();
    updatedData.memberIds = updatedData.memberIds.filter((id) => id !== userId);

    await groupRef.update({ memberIds: updatedData.memberIds });
    return { id: groupId, ...updatedData };
}