import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";

import Login from "./pages/Login";
import RoleRedirect from "./pages/RoleRedirect";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./dashboards/AdminDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import UserDashboard from "./dashboards/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Decides where to go after login */}
          <Route path="/redirect" element={ <ProtectedRoute>   <RoleRedirect /> </ProtectedRoute> } />

          {/* Role-specific dashboards */}
          <Route path="/admin" element={ <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

          <Route path="/manager" element={ <ProtectedRoute>  <ManagerDashboard />  </ProtectedRoute> }  />

          <Route path="/user" element={ <ProtectedRoute>  <UserDashboard /> </ProtectedRoute> }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
