import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Users, Eye, Shield, UserCheck, Loader2 } from "lucide-react";

const ManagerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  if (!user || user.role !== "manager") return null;

  const fetchUsers = async () => {
    try {
      const res = await api.get("users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield size={16} className="text-red-500" />;
      case "manager":
        return <UserCheck size={16} className="text-blue-500" />;
      default:
        return <Users size={16} className="text-gray-500" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-700 border-red-100";
      case "manager":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const filteredUsers = filter === "all" 
    ? users 
    : users.filter(u => u.role === filter);

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-gray-600" />
              </div>
              <h1 className="text-2xl font-light text-gray-900 tracking-tight">
                Manager Dashboard
              </h1>
            </div>
            <p className="text-gray-500">
              View user information and roles (read-only access)
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye size={16} />
            <span>Read-only</span>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-2xl font-light text-gray-900">{users.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Managers</p>
              <p className="text-2xl font-light text-gray-900">
                {users.filter(u => u.role === "manager").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserCheck size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Admins</p>
              <p className="text-2xl font-light text-gray-900">
                {users.filter(u => u.role === "admin").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* USER LIST */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-400" />
              <h3 className="font-medium text-gray-900">User Directory</h3>
              <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-0.5 rounded-full">
                {filteredUsers.length} users
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter by role:</span>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                {["all", "admin", "manager", "user"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilter(role)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      filter === role
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {role === "all" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading users...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                  <div className="col-span-4">User</div>
                  <div className="col-span-5">Email</div>
                  <div className="col-span-3">Role</div>
                </div>

                {/* Table Body */}
                {filteredUsers.map((u) => (
                  <div 
                    key={u.id} 
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center"
                  >
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {u.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.username}</p>
                          {u.id === user.id && (
                            <span className="text-xs text-gray-500">(You)</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-5">
                      <p className="text-gray-600 truncate">{u.email}</p>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm ${getRoleColor(u.role)}`}>
                          {getRoleIcon(u.role)}
                          <span>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Users size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-1">No users found</p>
                <p className="text-sm text-gray-400">
                  {filter === "all" 
                    ? "There are no users in the system"
                    : `No users with ${filter} role`
                  }
                </p>
                {filter !== "all" && (
                  <button
                    onClick={() => setFilter("all")}
                    className="mt-3 text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Show all users
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Summary Footer */}
        {!loading && filteredUsers.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Showing {filteredUsers.length} of {users.length} users
                {filter !== "all" && ` (filtered by ${filter} role)`}
              </span>
              <div className="flex items-center gap-2">
                <Eye size={14} />
                <span>Read-only access</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;