import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import Header from "../landing_page/Header";
import MobileMenu from "../landing_page/MobileMenu";
import "../landing_page/styles/headerStyle.css";
import AuthContext from '../../contexts/AuthContext';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL'


const API_BASE_URL = `${FRONTEND_API_BASE_URL}/api/groups`;

const headers = {
    Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
};

const GroupPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [groups, setGroups] = useState([]); // Store user's groups
    const [groupName, setGroupName] = useState("");
    const [joinGroupId, setJoinGroupId] = useState("");
    const { currentUser } = useContext(AuthContext); // Access currentUser from context

    // Memoize fetchGroups with useCallback
    const fetchGroups = useCallback(async () => {
        if (!currentUser) return; // Do nothing if user is not logged in

        try {
            const response = await axios.get(API_BASE_URL, { headers });
            // Filter groups where the user is a member
            const userGroups = response.data.data.filter(group => group.memberIds.includes(currentUser.uid));
            setGroups(userGroups);
        } catch (error) {
            console.error("Error fetching groups:", error);
            alert(error.response?.data?.message || "An unexpected error occurred.");
        }
    }, [currentUser]); // Add currentUser as a dependency

    // Fetch groups on component mount
    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]); // Add fetchGroups to the dependency array

    // Create a new group
    const handleCreateGroup = async () => {
        if (!currentUser) {
            alert("Please log in to create a group.");
            return;
        }

        if (!groupName) {
            alert("Please enter a group name.");
            return;
        }

        try {
            const newGroup = {
                groupName,
                creatorId: currentUser.uid,
                memberIds: [currentUser.uid],
                leaderboard: []
            };

            console.log("Sending request with data:", newGroup);

            const response = await axios.post(API_BASE_URL, newGroup, { headers });
            alert(`Group Created! ID: ${response.data.id}`);
            setGroups((prevGroups) => [...prevGroups, response.data.data]); // Update UI
            setGroupName(""); // Reset input
        } catch (error) {
            console.error("Error creating group:", error);
            alert(error.response?.data?.message || "Failed to create group.");
        }
    };

    // Join an existing group
    const handleJoinGroup = async () => {
        if (!currentUser) {
            alert("Please log in to join a group.");
            return;
        }

        if (!joinGroupId) {
            alert("Please enter a Group ID.");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/${joinGroupId}`,
                { joinUserId: currentUser.uid },
                { headers }
            );

            alert(response.data.message);
            await fetchGroups(); // Refresh the groups list
            setJoinGroupId(""); // Reset input
        } catch (error) {
            console.error("Error joining group:", error);
            alert(error.response?.data?.message || "Failed to join group.");
        }
    };

    // Leave a group
    const handleLeaveGroup = async (groupId, userId) => {
        if (!currentUser) {
            alert("Please log in to leave a group.");
            return;
        }

        try {
            const url = `${API_BASE_URL}/${groupId}/users/${userId}`;
            console.log("Leaving group with URL:", url);
            const response = await axios.delete(url, { headers });

            alert(response.data.message);
            await fetchGroups(); // Refresh the list after leaving
        } catch (error) {
            console.error("Error leaving group:", error);
            alert(error.response?.data?.message || "Failed to leave group.");
        }
    };

    // If user is not logged in, show a message
    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-100">
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <MobileMenu isMenuOpen={isMenuOpen} />
                <main className="flex flex-col items-center justify-center p-6">
                    <h2 className="nav-link2">FriendGroups</h2>
                    <p className="text-gray-600 mt-4">Please log in to view your groups.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} />
            <main className="flex flex-col items-center justify-center p-6">
                <h2 className="nav-link2">FriendGroups</h2>

                {groups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-white shadow-md rounded-lg p-4">
                                <button onClick={() => handleLeaveGroup(group.id, currentUser.uid)} className="text-red-500">Leave Group</button>
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