const Sidebar = ({ role }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Codeedex</h2>

      <nav className="space-y-4 text-sm">
        <p className="text-slate-400 uppercase tracking-wide">Menu</p>

        <div className="hover:text-indigo-400 cursor-pointer">
          Dashboard
        </div>

        {role === "admin" && (
          <div className="hover:text-indigo-400 cursor-pointer">
            User Management
          </div>
        )}

        {role === "manager" && (
          <div className="hover:text-indigo-400 cursor-pointer">
            Manager Panel
          </div>
        )}

        {role === "user" && (
          <div className="hover:text-indigo-400 cursor-pointer">
            My Access
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
