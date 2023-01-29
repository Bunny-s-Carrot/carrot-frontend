import NavBar from "../../components/navBar";
import MycarrotList from "../../components/mycarrot/list"
import Profile from '../../components/mycarrot/profile';
import CarrotPay from '../../components/mycarrot/carrotpay';
import styled from 'styled-components';

const MyCarrot = () => {
  return (
    <Container>
      <Profile />
      <CarrotPay />
      <MycarrotList />
      <Space></Space>
      <NavBar pageType='MYCARROT' />
    </Container>
  )
};

export default MyCarrot;

const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
  padding-top: 3.2rem;
  background: white;
`

const Space = styled.div`
  height: 6.4rem;`