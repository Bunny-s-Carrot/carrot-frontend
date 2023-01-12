import NavBar from "../../components/navBar";
// import PopularPost from "../../components/neighborhood/popularpost";

import styled from 'styled-components';
import theme from '@carrot/core/style/theme';
import HeaderTemplate from '../../templates/headerTemplate';
import TopicBar from "../../components/neighborhood/topicbar";
import Post from '../../components/neighborhood/post'

import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import searchIcon from '@carrot/core/assets/icon/search.svg';
import profileIcon from '@carrot/core/assets/icon/profile.svg';
import notiIcon from '@carrot/core/assets/icon/notification.svg';

import usePostViewModel from './post.viewModel';
import FloatingButton from "../../components/floatingButton";

const Neighborhood = () => {
  const postViewModel = usePostViewModel();
  const results = postViewModel.data?.payload;

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
    <>
      <HeaderTemplate 
        leftContent={LeftContent}
        rightContent={RightContent}
      >
        <TopicBar />
        <PostContainer>
          {results?.map((item, index) => (
            <Post 
            key={index} 
            title={item.title} 
            created_at={item.created_at} 
            />
          ))}
        </PostContainer>
      </HeaderTemplate>
      <FloatingButton pageType='NEIGHBORHOOD'/>
      <NavBar pageType="NEIGHBORHOOD" />
    </>
  );
};

export default Neighborhood;

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

const PostContainer = styled.div`
`