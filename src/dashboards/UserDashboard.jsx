import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.role !== "user") return null;

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user.username}
        </h1>
        <p className="text-gray-600">
          This is your user dashboard with basic access.
        </p>
      </div>

      {/* Simple Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Account Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Account Role</p>
            <p className="font-medium">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <p className="font-medium text-green-600">Active</p>
          </div>
        </div>
      </div>

     



    </DashboardLayout>
  );
};

export default UserDashboard;