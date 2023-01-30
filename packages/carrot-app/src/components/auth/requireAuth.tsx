import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authProvider";
import useToken from "../../hooks/auth/useToken";


const RequireAuth = () => {
  const { auth } = useAuth();
  const { refreshToken } = useToken();
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