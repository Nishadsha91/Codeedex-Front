const Topbar = ({ user, onLogout }) => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-700">
        {user.role.toUpperCase()} DASHBOARD
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user.username}
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
