import {useState, useContext} from "react";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from "../../templates/headerTemplate";
import Button from "@carrot/core/atoms/button";
import TextInput from "@carrot/core/atoms/input/textInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import AuthContext from "../../contexts/auth/authProvider";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import { setCurrentLocation, setLocation } from "../../infra/location/locationData";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  const loginMutate = useMutation(authApi.login, {
    onSuccess: ({ data }) => {
      const token = {
        token: data?.token
      }

      const locationData = data?.locationData;
      setAuth(token);
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
      setLocation(locationData.location_id, locationData.lowest_sect_name, locationData.h_code, locationData.x_coord, locationData.y_coord)
      setCurrentLocation(locationData.lowest_sect_name)
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      loginMutate.mutate({ email, password })
    }
  }

  return (
    <HeaderTemplate 
      onClickLeft={() => navigate('/')}
      leftContent={<img src={backIcon} alt='backIcon' />}
    >
      <Container>
        <TextHeader>로그인 정보를 입력해주세요.</TextHeader>
        <InputForm>
          <TextInput
            placeholder="이메일 주소를 입력해주세요"
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            inputType="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton
            buttonType='WHITE'
            onClick={(e) => handleLogin(e)}
            disabled={email.length === 0 || password.length === 0}>로그인</LoginButton>
        </InputForm>
        <ForgotPassword>
          비밀번호를 잊어버렸나요? <span>비밀번호 찾기</span>
        </ForgotPassword>
      </Container>
    </HeaderTemplate>
  )
}

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.6rem;
`
const TextHeader = styled.p`
  display: block;
  ${theme.typography.heading3};
`
const InputForm = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

`
const LoginButton = styled(Button)`
  width: 100%;
  height: 4.2rem;
  margin-top: 0.8rem;
  ${theme.typography.body2};
  font-weight: bold;
`
const ForgotPassword = styled.div`
  ${theme.typography.body4}
  text-align: center;
  span {
    text-decoration: underline;
  }
`