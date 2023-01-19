import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderTemplate from '../../templates/headerTemplate';
import backIcon from '@carrot/core/assets/icon/back-arrow.svg'
import Input from '@carrot/core/atoms/input/textInput'
import Button from '@carrot/core/atoms/button';
import theme from '@carrot/core/style/theme';
import useSignupViewModel from './signup.viewModel';

const SignupPage = () => {
  const navigate = useNavigate();
  const signupViewModel = useSignupViewModel();

  return (
    <HeaderTemplate
      leftContent={<img src={backIcon} alt='backIcon'/>}
      onClickLeft={() => navigate(-1)}  
    >
      <Container>
        <InputWrapper>
          <TextInput 
            placeholder='이메일 주소를 입력해주세요'
            required
            inputType='email'
            onChange={e => signupViewModel.setEmail(e.target.value)}
            value={signupViewModel.email}
          />
          <TextInput 
            placeholder='비밀번호를 입력해주세요'
            inputType='password'
            required
            onChange={e => signupViewModel.setPassword(e.target.value)}
            value={signupViewModel.password}
          />
          <TextInput 
            placeholder='비밀번호를 한번 더 입력해주세요'
            inputType='password'
            required
            onChange={e => signupViewModel.setPasswordConfirm(e.target.value)}
            value={signupViewModel.passwordConfirm}
          />
          <TextInput 
            placeholder='이름을 입력해주세요'
            required
            onChange={e => signupViewModel.setName(e.target.value)}
            value={signupViewModel.name}
          />
          <TextInput 
            placeholder=''
            onChange={() => {}}
            value={signupViewModel.locationData.fullName}
          />
          <SubmitButton
            buttonType='CARROT'
            onClick={signupViewModel.handleClickSignup}
          >
            회원가입
          </SubmitButton>
        </InputWrapper>
      </Container>
    </HeaderTemplate>      
  )
}

export default SignupPage;

const Container = styled.div`
  padding: 1.6rem;
`
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
const TextInput = styled(Input)`
  input {
    ${theme.typography.body3};
  }  
`
const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`
