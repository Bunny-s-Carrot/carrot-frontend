import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from "../../templates/headerTemplate";
import Button from "@carrot/core/atoms/button";
import TextInput from "@carrot/core/atoms/input/textInput";
import { useNavigate } from "react-router-dom";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import useLoginViewModel from "./login.viewModel";


const LoginPage = () => {

  const navigate = useNavigate();
  const loginViewModel = useLoginViewModel();
  return (
    <HeaderTemplate 
      onClickLeft={() => navigate('/')}
      leftContent={<img src={backIcon} alt='backIcon' />}
    >
      <Container>
        <TextHeader>로그인 정보를 입력해주세요.</TextHeader>
        <InputForm onSubmit={(e) => {
              loginViewModel.handleLogin(e)
            }}>
          <TextInput
            placeholder="이메일 주소를 입력해주세요"
            inputType="email"
            value={loginViewModel.email}
            onChange={(e) => loginViewModel.setEmail(e.target.value)}
          />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            inputType="password"
            value={loginViewModel.password}
            onChange={(e) => loginViewModel.setPassword(e.target.value)}
          />
          <LoginButton
            buttonType='WHITE'
            onClick={(e) => {
              loginViewModel.handleLogin(e)
            }}
            disabled={loginViewModel.email.length === 0 || loginViewModel.password.length === 0}
          >
            로그인
          </LoginButton>
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