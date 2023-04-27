import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authProvider";
import useToken from "../../hooks/auth/useToken";
import { useReIssueContext } from "../../contexts/auth/reIssueProvider";


const RequireAuth = () => {
  const { auth } = useAuth();
  const { reloading } = useReIssueContext()
  const { refreshToken } = useToken();
  const location = useLocation();


  useEffect(() => {
    if (!auth.token) {
      refreshToken();
    }
  }, [auth.token, refreshToken])
  return (
    !reloading && auth.token
      ? <Outlet />
      : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}

export default RequireAuth;