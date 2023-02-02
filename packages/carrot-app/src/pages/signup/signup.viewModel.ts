import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import authApi from "../../api/auth";
import { setActiveLocation, setAdmCodes, setArea1 } from "../../infra/location/locationData";



const useSignupViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [locationName, setLocationName] = useState('');

  const locationData = location.state;

  useEffect(() => {
    !locationData && navigate('/findlocation');
  })

  const signup = useMutation(authApi.signup);

  const handleClickSignup = () => {
    signup.mutate(
      {email, password, name, locationId: locationData.id},
      {
        onSuccess: () => {
          alert('등록 성공');
          setActiveLocation(locationData.name)
          setArea1(0)
          setAdmCodes(["'" + locationData.admCode + "'"])
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
    locationName,
    setLocationName,
    handleClickSignup,
    locationData,
  }
}


export default useSignupViewModel