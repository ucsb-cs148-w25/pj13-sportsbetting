import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../landing_page/Header";
import MobileMenu from "../landing_page/MobileMenu";
import "../landing_page/styles/headerStyle.css";

const API_BASE_URL = "http://localhost:5000/api/groups"; // Update if needed

// Hardcoded user data for testing
const hardcodedUser = {
    uid: "testUser123", // Fake UID (Use real ones later)
    displayName: "Test User"
};

const GroupPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [groups, setGroups] = useState([]); // Store user's groups
    const [groupName, setGroupName] = useState("");
    const [joinGroupId, setJoinGroupId] = useState("");

    useEffect(() => {
        fetchGroups();
    }, []);

    //  Fetch groups where the user is a member
    const fetchGroups = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            // Filter groups where the hardcoded user is a member
            const userGroups = response.data.data.filter(group => group.memberIds.includes(hardcodedUser.uid));
            setGroups(userGroups);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    //  Create a new group
    const handleCreateGroup = async () => {
        if (!groupName) {
            alert("Please enter a group name.");
            return;
        }

        try {
            const newGroup = {
                groupName,
                creatorId: hardcodedUser.uid,
                memberIds: [hardcodedUser.uid],
                leaderboard: []
            };

            console.log("Sending request with data:", newGroup);

            const response = await axios.post(API_BASE_URL, newGroup);
            alert(`Group Created! ID: ${response.data.id}`);
            setGroups([...groups, response.data.data]); // Update UI
            setGroupName(""); // Reset input
        } catch (error) {
            console.error("Error creating group:", error);

            // Detailed logging
            console.error("Error Status:", error.response?.status); // HTTP status code
            console.error("Error Headers:", error.response?.headers); // Response headers
            console.error("Error Data:", error.response?.data); // Backend error message
            alert(error.response?.data?.message || "Failed to create group.");
        }
    };

    //  Join an existing group
    const handleJoinGroup = async () => {
        if (!joinGroupId) {
            alert("Please enter a Group ID.");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/${joinGroupId}`,
                { joinUserId: hardcodedUser.uid }
            );

            alert(response.data.message);
            await fetchGroups(); // Refresh the groups list
            setJoinGroupId(""); // Reset input
        } catch (error) {
            console.error("Error joining group:", error);
            alert(error.response?.data?.message || "Failed to join group.");
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${joinGroupId}`,
                { leaveUserId: hardcodedUser.uid }
            );
        } catch(error){
            console.error("Error leaving group:", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} />
            <main className="flex flex-col items-center justify-center p-6">
                <h2 className="logo">Your Groups</h2>

                {groups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-white shadow-md rounded-lg p-4">
                                <button onClick={handleLeaveGroup} className="text-red-500">Leave Group</button>
                                <h3 className="text-lg font-semibold text-gray-800">{group.groupName}</h3>
                                <p className="text-gray-600">Group ID: {group.id}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 mt-4">You are not currently in any groups.</p>
                )}

                {/* Group Actions */}
                <div className="mt-4 flex flex-col space-y-4 w-full max-w-sm">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"

                        />
                        <button
                            onClick={handleCreateGroup}
                            className="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600">
                            Create Group
                        </button>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Group ID"
                            value={joinGroupId}
                            onChange={(e) => setJoinGroupId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"

                        />
                        <button
                            onClick={handleJoinGroup}
                            className="w-full bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600">
                            Join Group
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GroupPage;
