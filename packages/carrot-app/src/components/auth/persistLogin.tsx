import {useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useToken from '../../hooks/auth/useToken';
import { useAuth } from '../../contexts/auth/authProvider';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        isMounted && setIsLoading(false);
      }
    }

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => { isMounted = false }
  }, [auth?.token, refreshToken])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.token)}`);
  }, [isLoading, auth?.token])

  return (
    <>
      {isLoading
        ? <p>Loading ...</p>
        : <Outlet />}
    </>
  )
}

export default PersistLogin;