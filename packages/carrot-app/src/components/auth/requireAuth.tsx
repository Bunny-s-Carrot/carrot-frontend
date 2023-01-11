import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authProvider";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth.userId
      ? <Outlet />
      : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}

export default RequireAuth;