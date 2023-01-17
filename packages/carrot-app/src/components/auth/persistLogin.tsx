import {useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../../hooks/auth/useRefreshToken';
import { useAuth } from '../../contexts/auth/authProvider';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();
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
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.token)}`);
  }, [isLoading])

  return (
    <>
      {isLoading
        ? <p>Loading ...</p>
        : <Outlet />}
    </>
  )
}

export default PersistLogin;