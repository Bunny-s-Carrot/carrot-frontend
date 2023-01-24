import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authProvider";
import useRefreshToken from "../../hooks/auth/useRefreshToken";


const RequireAuth = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();
  const location = useLocation();


  useEffect(() => {
    if (!auth.token) {
      refreshToken();
    }
  }, [auth.token, refreshToken])
  return (
    auth.token
      ? <Outlet />
      : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}

export default RequireAuth;