import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RoleRedirect = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "manager") navigate("/manager");
    else navigate("/user");
  }, [user, navigate]);

  return null;
};

export default RoleRedirect;
