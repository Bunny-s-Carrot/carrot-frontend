import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth/authProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import { getAdmCodes, getArea1, setActiveLocation, setActiveLocationId, setAdmCodes, setArea1 } from "../../infra/location/locationData";

const useLoginViewModel = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  
  const loginMutate = useMutation(authApi.login, {
    onSuccess: ({ data }) => {
      const token = { token: data?.token }
      const locationData = data?.locationData;
      setAuth(token);
      setEmail('');
      setPassword('');
      if (!getAdmCodes()) {
        setAdmCodes(["'" + locationData.admCode + "'"]);
      }
      if (!getArea1()) setArea1(0)
      setActiveLocation(
        locationData.active_location === 1
        ? locationData.location_name2
        : locationData.location_name);
      setActiveLocationId(
        locationData.active_location === 1
        ? locationData.location2
        : locationData.location
      );
      navigate(from, { replace: true });

    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      loginMutate.mutate({ email, password })
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,

    handleLogin
  }
}

export default useLoginViewModel