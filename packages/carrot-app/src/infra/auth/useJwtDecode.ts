import jwtDecode from 'jwt-decode'
import { useAuth } from '../../contexts/auth/authProvider'
import { JwtToken } from '../../api/auth/authDto';
import moment from 'moment';

const useJwtDecode = () => {
  const { auth } = useAuth();

  const jwt = auth?.token ?? '';
  const decodedJwt = jwtDecode(jwt ?? '') as JwtToken

  const getId = () => decodedJwt.user_id;

  const getName = () => decodedJwt.name;

  const getEmail = () => decodedJwt.email;

  const getLocation = () => decodedJwt.location;

  const getMannerTemp = () => decodedJwt.manner_temp;

  const getToken = () => jwt;

  const isSigned = () => {
    if (!auth.token) return false;
    if (moment().isAfter(moment(decodedJwt.exp * 1000))) return false;
    
    return true;
  }

  return {
    getId,
    getName,
    getEmail,
    getLocation,
    getMannerTemp,
    getToken,
    isSigned,
  }
}

export default useJwtDecode;