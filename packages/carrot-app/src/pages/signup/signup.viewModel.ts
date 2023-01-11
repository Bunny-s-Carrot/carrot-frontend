import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import authApi from "../../api/auth";



const useSignupViewModel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');

  const signup = useMutation(authApi.signup);

  const handleClickSignup = () => {

    signup.mutate(
      {email, password, name, locationId},
      {
        onSuccess: () => {
          alert('등록 성공');
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
  }
}


export default useSignupViewModel