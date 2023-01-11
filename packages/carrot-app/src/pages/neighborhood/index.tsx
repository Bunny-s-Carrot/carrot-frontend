import NavBar from "../../components/navBar";
// import PopularPost from "../../components/neighborhood/popularpost";
// import Post from "../../components/neighborhood/post";
// import TopicBar from "../../components/neighborhood/topicbar";
import backIcon from '@carrot/core/assets/icon/back_arrow.svg';
import HeaderTemplate from '../../templates/headerTemplate';
import searchIcon from '@carrot/core/assets/icon/search.svg';
import profileIcon from '@carrot/core/assets/icon/profile.svg';
import notiIcon from '@carrot/core/assets/icon/notification.svg';
import styled from 'styled-components';
import theme from '@carrot/core/style/theme';

const Neighborhood = () => {

  const LeftContent = (
    <Locationdiv>
      <p>연희동</p>
      <img className='down' src={backIcon} alt='backIcon' />
    </Locationdiv>
  )

  const RightContent = (
    <Icondiv>
      <img src={searchIcon} alt='searchIcon' />
      <img src={profileIcon} alt='profileIcon' />
      <img src={notiIcon} alt='notiIcon' />
    </Icondiv>
  )

  return (
    <>
      <HeaderTemplate 
        leftContent={LeftContent}
        rightContent={RightContent}
      >
        여기에 JSX엘리먼트 넣으면 됩니다
      </HeaderTemplate>
      <NavBar pageType="NEIGHBORHOOD" />
    </>
  );
};

export default Neighborhood;


const Locationdiv = styled.div`
padding: 0.3rem;
display: flex;
align-items: center;

&:hover {
  background: ${theme.colors.grey30};
  cursor: pointer;
}
`
const Icondiv = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
`

