import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import "../landing_page/styles/headerStyle.css";
import AuthContext from '../../contexts/AuthContext';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, LogIn, AlertCircle, X } from "lucide-react";

const API_BASE_URL = `${FRONTEND_API_BASE_URL}/api/groups`;

const headers = {
    Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
};

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [joinGroupId, setJoinGroupId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchGroups = useCallback(async () => {
        if (!currentUser) return;
        
        setIsLoading(true);
        try {
            const response = await axios.get(API_BASE_URL, { headers });
            const userGroups = response.data.data.filter(group => group.memberIds.includes(currentUser.uid));
            setGroups(userGroups);
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please log in to create a group.");
            return;
        }

        if (!groupName.trim()) {
            alert("Please enter a group name.");
            return;
        }

        setIsLoading(true);
        try {
            const newGroup = {
                groupName,
                creatorId: currentUser.uid,
                memberIds: [currentUser.uid],
                leaderboard: []
            };

            const response = await axios.post(API_BASE_URL, newGroup, { headers });
            setGroups((prevGroups) => [...prevGroups, response.data.data]);
            setGroupName("");
            alert(`Group created! ID: ${response.data.id}`);
        } catch (error) {
            console.error("Error creating group:", error);
            alert(error.response?.data?.message || "Failed to create group.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please log in to join a group.");
            return;
        }

        if (!joinGroupId.trim()) {
            alert("Please enter a Group ID.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.put(
                `${API_BASE_URL}/${joinGroupId}`,
                { joinUserId: currentUser.uid },
                { headers }
            );

            alert(response.data.message);
            await fetchGroups();
            setJoinGroupId("");
        } catch (error) {
            console.error("Error joining group:", error);
            alert(error.response?.data?.message || "Failed to join group.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async (e, groupId, userId) => {
        e.stopPropagation();
        
        if (!currentUser) {
            alert("Please log in to leave a group.");
            return;
        }

        if (!window.confirm("Are you sure you want to leave this group?")) {
            return;
        }

        setIsLoading(true);
        try {
            const url = `${API_BASE_URL}/${groupId}/users/${userId}`;
            const response = await axios.delete(url, { headers });
            alert(response.data.message);
            await fetchGroups();
        } catch (error) {
            console.error("Error leaving group:", error);
            alert(error.response?.data?.message || "Failed to leave group.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-t-blue-500 text-center">
                    <AlertCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Friend Groups</h2>
                    <p className="text-gray-600">Please log in to view your groups.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 min-h-screen">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border">
                <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Friend Groups</h2>
                </div>
                <p className="text-gray-600">
                    Join or create groups to bet with friends and track your standings!
                </p>
            </div>

            {/* Group Cards */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {groups.length} Groups
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : groups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groups.map((group) => (
                            <div 
                                key={group.id} 
                                onClick={() => navigate(`/group/${group.id}`)}
                                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="bg-green-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900">{group.groupName}</h3>
                                    <button
                                        onClick={(e) => handleLeaveGroup(e, group.id, currentUser.uid)}
                                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                                    >
                                        <X className="h-4 w-4" />
                                        Leave
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-500">Group ID: <span className="font-medium text-gray-700">{group.id}</span></p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {group.memberIds?.length || 0} Members
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">You are not currently in any groups.</p>
                    </div>
                )}
            </div>

            {/* Group Actions */}
            <div className="bg-white rounded-xl shadow-md p-8 border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Group */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Create New Group</h3>
                        </div>
                        <form onSubmit={handleCreateGroup} className="space-y-4">
                            <div>
                                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Group Name
                                </label>
                                <input
                                    id="groupName"
                                    type="text"
                                    placeholder="Enter group name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                {isLoading ? 'Creating...' : 'Create Group'}
                            </button>
                        </form>
                    </div>

                    {/* Join Group */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <LogIn className="h-5 w-5 text-green-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Join Existing Group</h3>
                        </div>
                        <form onSubmit={handleJoinGroup} className="space-y-4">
                            <div>
                                <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-1">
                                    Group ID
                                </label>
                                <input
                                    id="groupId"
                                    type="text"
                                    placeholder="Enter Group ID"
                                    value={joinGroupId}
                                    onChange={(e) => setJoinGroupId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogIn className="h-4 w-4" />
                                {isLoading ? 'Joining...' : 'Join Group'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupPage;