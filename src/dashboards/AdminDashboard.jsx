import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Plus, Trash2, UserPlus, Users, Loader2, ChevronDown } from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!user || user.role !== "admin") return null;

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    const res = await api.get("users/");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- CREATE USER ---------------- */
  const createUser = async () => {
    setLoading(true);
    await api.post("users/", form);
    setForm({ username: "", email: "", password: "", role: "user" });
    setShowCreateForm(false);
    await fetchUsers();
    setLoading(false);
  };

  /* ---------------- UPDATE USER ---------------- */
  const updateUserRole = async (id, role) => {
    await api.put(`users/${id}/`, { role });
    fetchUsers();
  };

  /* ---------------- DELETE USER ---------------- */
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`users/${id}/`);
    fetchUsers();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "bg-red-50 text-red-700 border-red-200";
      case "manager": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {showCreateForm ? (
              <>
                <ChevronDown size={18} className="rotate-180" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>New User</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CREATE USER CARD - Minimal expandable form */}
      {showCreateForm && (
        <div className="mb-8 animate-fadeIn">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={18} className="text-gray-400" />
              Create New User
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="johndoe"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white appearance-none cursor-pointer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={createUser}
                disabled={loading}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER LIST - Minimal table design */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-400" />
              <h3 className="font-medium text-gray-900">All Users</h3>
              <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-0.5 rounded-full">
                {users.length} users
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
              <div className="col-span-3">User</div>
              <div className="col-span-5">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Table Body */}
            {users.map((u) => (
              <div key={u.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center">
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {u.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{u.username}</span>
                  </div>
                </div>
                
                <div className="col-span-5 text-gray-600 truncate">{u.email}</div>
                
                <div className="col-span-2">
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                    className={`text-sm px-3 py-1.5 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer ${getRoleColor(u.role)}`}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </div>
                
                <div className="col-span-2">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {users.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Users size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No users found</p>
                <p className="text-sm text-gray-400 mt-1">Create your first user above</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add this to your global CSS for the fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminDashboard;