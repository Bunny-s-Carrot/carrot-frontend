import styled from 'styled-components';
import theme from '@carrot/core/style/theme';
import HeaderTemplate from '../../templates/headerTemplate';
import TopicBar from "../../components/neighborhood/topicbar";
import Post from '../../components/neighborhood/post'
import NavBar from "../../components/navBar";
import backIcon from '@carrot/core/assets/icon/back_arrow.svg';
import searchIcon from '@carrot/core/assets/icon/search.svg';
import profileIcon from '@carrot/core/assets/icon/profile.svg';
import notiIcon from '@carrot/core/assets/icon/notification.svg';


const Neighborhood = () => {

  let LeftContent = (
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
    <div>
      <StyledHeaderTemplate 
        leftContent={LeftContent}
        rightContent={RightContent}
      />
      <TopicBar />
      <Post />
      <NavBar pageType="NEIGHBORHOOD" />
    </div>
  );
};

export default Neighborhood;


const StyledHeaderTemplate = styled(HeaderTemplate)`

  font-size: 20px;
  align-items: center;

  img {
    width: 4rem;
    height: 4rem;
    margin: 3px;
    padding: 8px;
  }

  img:hover {
    background: ${theme.colors.grey30};
    border-radius: 18px;
  }

  .down {
    width: 2.7rem;
    height: 2.7rem;
    transform: rotate(-90deg);
    margin: 4px 0;
  }

  .down:hover {
    background: none;
    cursor: pointer;
  }
`

const Locationdiv = styled.div`
padding: 0.3rem;
font-weight: 700;
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

