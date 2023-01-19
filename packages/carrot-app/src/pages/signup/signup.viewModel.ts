import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import authApi from "../../api/auth";
import { setActiveLocation } from "../../infra/location/activeLocation";



const useSignupViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');

  const locationData = location.state;

  const signup = useMutation(authApi.signup);

  const handleClickSignup = () => {
    signup.mutate(
      {email, password, name, locationId},
      {
        onSuccess: () => {
          alert('등록 성공');
          setActiveLocation(locationData.name)
          navigate('/home');

        }
      }
    )
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    name,
    setName,
    locationId,
    setLocationId,
    locationName,
    setLocationName,
    handleClickSignup,
    locationData,
  }
}


export default useSignupViewModel