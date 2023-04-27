import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useToken from '../../hooks/auth/useToken';
import { useAuth } from '../../contexts/auth/authProvider';
import { useReIssueContext } from '../../contexts/auth/reIssueProvider';

const PersistLogin = () => {
  const { reloading, setReloading } = useReIssueContext();
  const { refreshToken } = useToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setReloading(false);
      }
    }
    !auth?.token ? verifyRefreshToken() : setReloading(false);

    return () => { isMounted = false }
  }, [auth?.token, refreshToken, setReloading])

  return (
    <>
      {reloading
        ? <p>Loading ...</p>
        : <Outlet />}
    </>
  )
}

export default PersistLogin;