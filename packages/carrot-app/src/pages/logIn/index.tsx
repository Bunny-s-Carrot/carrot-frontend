import React from "react";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from "../../templates/headerTemplate";
import Button from "@carrot/core/atoms/button";
import TextInput from "@carrot/core/atoms/input/textInput";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  return (
    <HeaderTemplate onClickBack={() => navigate('/')}>
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
            type='WHITE'
            onClick={() => {}}
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
const InputForm = styled.form`
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