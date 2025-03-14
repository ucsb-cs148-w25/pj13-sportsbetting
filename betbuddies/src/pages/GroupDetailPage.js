import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Trophy, Medal, Users } from "lucide-react";
import FRONTEND_API_BASE_URL from "../API_BASE_URL";
import AuthContext from "../contexts/AuthContext";

function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState({name: "", memberIds: []});
    const [users, setUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchGroup = async () => {
            const headers = {
                Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
            };
    
            try {
                const groupResponse = await axios.get(`${FRONTEND_API_BASE_URL}/api/groups/${id}`, { headers });
                const groupData = groupResponse.data.data;
                setGroup(groupData);

                const usersID = groupData.memberIds;
                const usersData = await Promise.all(usersID.map(userId =>
                    axios.get(`${FRONTEND_API_BASE_URL}/api/users/${userId}`, { headers })
                ));

                const users = usersData
                    .map(user => user.data.data)
                    .sort((a, b) => b.balance - a.balance);
                
                setUsers(users);
            } catch (error) {
                console.error("Error fetching group:", error);
            }
        };

        fetchGroup();
    }, [id]);

    const getRankIcon = (index) =>{
        switch(index) {
            case 0:
                return <Trophy className="h-6 w-6 text-yellow-500" />;
            case 1:
                return <Medal className="h-6 w-6 text-gray-400" />;
            case 2:
                return <Medal className="h-6 w-6 text-yellow-600" />;
            default:
                return (
                    <div className="h-6 w-6 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        #{index + 1}
                    </div>
                );
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            {/* Group Header */}
            <div className="mb-8">
                <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-600 mr-2" />
                    <h2 className="text-4xl font-bold text-center text-gray-900">
                        {group.groupName}
                    </h2>
                </div>
                <p className="text-center text-gray-500">{group.memberIds.length} members</p>
            </div>

            {/* Group Stats Summary*/}
            <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
                    <p className="text-gray-500 text-sm">Total Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ${users.reduce((sum, user) => sum + user.balance, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
                    <p className="text-gray-500 text-sm">Average Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ${(users.length > 0 
                            ? (users.reduce((sum, user) => sum + user.balance, 0) / users.length)
                            : 0
                        ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
            
            {/* Members List*/}
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Members</h3>
            </div>

            <div className="space-y-3">
                {users.map((user, index) => (
                    <div
                        key={user.id}
                        className={`grid grid-cols-10 items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer ${
                            user.id === currentUser.uid ? 'bg-blue-50' : ''
                        }`}
                        // onClick={() => handleUserClick(user.id)} // For future implementation
                    >
                        {/* Rank Icon */}
                        <div className="col-span-1 flex justify-center">
                            {getRankIcon(index)}
                        </div>

                        {/* Username */}
                        <div className="col-span-6 text-left">
                            <h3 className={`font-semibold ${
                                user.id === currentUser.uid ? 'text-blue-700' : 'text-gray-900'
                            }`}>
                                {user.username}
                            </h3>
                        </div>

                        {/* Balance */}
                        <div className="col-span-3 text-right">
                            <span className={`font-semibold ${
                                user.id === currentUser.uid ? 'text-blue-600' : 'text-green-600'
                            }`}>
                                ${user.balance.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupDetailPage;