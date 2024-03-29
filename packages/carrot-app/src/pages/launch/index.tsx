import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Button from '@carrot/core/atoms/button'
import theme from '@carrot/core/style/theme';
import Logo from '@carrot/core/assets/img/logo.png'
import { useAuth } from '../../contexts/auth/authProvider';

const LaunchPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.token) navigate('/home');
  }, [navigate, auth?.token])

  return (
    <Container>
      <Welcome>
        <LogoWrapper>
          <img src={Logo} alt='로고 이미지'/>
        </LogoWrapper>
        <p>당신 근처의 바니마켓</p>
        <p>
          내 동네를 설정하고 <br />
          바니마켓을 시작해보세요
        </p>
      </Welcome>
      <AuthArea>
        <StartButton
        buttonType='CARROT'
        onClick={() => {navigate('/findlocation',
        {
          state: { from: 'launch' }
        })}}
        >
          시작하기
        </StartButton>
        <LoginSession>
          이미 계정이 있나요? <span onClick={() => navigate('/auth/login')}>로그인</span>
        </LoginSession>
      </AuthArea>
      
    </Container>
    
  )
}

export default LaunchPage;

const Container = styled.div`
  height: 100%;
  background: white;
  padding: 4.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20rem;
`
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  text-align: center;
  ${theme.typography.body3};
  p:first-of-type {
    ${theme.typography.heading3};
  }
`
const LogoWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  img {
    width: 100%;
    height: 100%;
    content-fit: cover;
  }

`
const AuthArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
`
const StartButton = styled(Button)`
  width: 100%;
  height: 4.8rem;
`
const LoginSession = styled.p`
  color: ${theme.colors.grey50};
  ${theme.typography.body3};
  span {
    color: ${theme.colors.carrot};
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
`