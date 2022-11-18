import NavBar from "../../components/navBar";
import MycarrotList from "../../components/mycarrot/list"
import Profile from '../../components/mycarrot/profile';
import CarrotPay from '../../components/mycarrot/carrotpay';
import styled from 'styled-components';

const MyCarrot = () => {
  return (
    <AAA>
      <Profile />
      <CarrotPay />
      <MycarrotList />
      <Space>1</Space>
      <NavBar pageType='MYCARROT' />
    </AAA>
  )
};

export default MyCarrot;

const AAA = styled.div`
height: 100vh;
box-sizing: border-box;
overflow: scroll
`

const Space = styled.div`
height: 6.4rem;`