import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import usePostDetailViewModel from './[post_id].viewModel';
import HeaderTemplate from '../../../templates/headerTemplate';
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import homeIcon from '@carrot/core/assets/icon/home-outline.svg';
import thumbIcon from "@carrot/core/assets/icon/Thumb.svg";
import heartIcon from "@carrot/core/assets/icon/heart-grey.svg";
import chatIcon from '@carrot/core/assets/icon/chat-outline-grey.svg'


const PostDetailPage = () => {
    const navigate = useNavigate();
    const PostDetailViewModel = usePostDetailViewModel();

    const leftContent = 
    <>
      <Icon_head src={backIcon} alt='backIcon' />
      <Icon_head src={homeIcon} alt='homeIcon' />
    </>

    return (
        <HeaderTemplate
        leftContent={leftContent}
        onClickLeft={() => navigate(-1)}
        >
          <Container>
            <Category>
              <Color>
                {PostDetailViewModel.data?.post.category_name}  
              </Color>
            </Category>
            <UserInfo>유저정보</UserInfo>
            <Content>
              {PostDetailViewModel.data?.post.title}<br/><br/><br/>
              {PostDetailViewModel.data?.post.content}<br/><br/>
              <Empa>조회 {PostDetailViewModel.data?.post.empa_count}</Empa>
            </Content>
            <Buttons>
              <Btn>
                <Icon src={thumbIcon} />&nbsp; 공감하기
              </Btn>
              <Btn>
                <Icon src={chatIcon} />&nbsp; 댓글쓰기
              </Btn>
              <Btn>
                <Icon src={heartIcon} />&nbsp; 관심
              </Btn>
            </Buttons>
            <Comment>아직 댓글이 없어요.<br/><br/>가장 먼저 댓글을 남겨보세요.</Comment>
          </Container>
        </HeaderTemplate>
        
    )
}


export default PostDetailPage;

const styledHeaderTemplate = styled(HeaderTemplate)`
img {
  max-height: 2.6rem;
}`

const Container = styled.div`

`

const Category = styled.div`
padding: 15px 8px;
`

const Color = styled.span`
background: ${theme.colors.grey30};
border-radius: 3px;
font-size: 12px;
padding: 4px;
`

const UserInfo = styled.div`
height: 50px;
border: 1px solid black;
`

const Content = styled.div`
padding: 15px 10px;
font-size: 16px;
border-bottom: 1px solid ${theme.colors.grey30};
`

const Empa = styled.p`
color: ${theme.colors.grey50};
font-size: 13px;
`

const Buttons = styled.div`
border-bottom: 1px solid ${theme.colors.grey30};
color: ${theme.colors.grey70};
display: flex;
align-items: center;
`

const Btn = styled.div`
width: 33%;
display: flex;
align-items: center;
justify-content: center;
padding: 7px 0;
font-size: 12px;
`

const Comment = styled.div`
text-align: center;
padding: 25px 0 35px 0;
color: ${theme.colors.grey50};
font-size: 18px;
border-bottom: 8.5px solid ${theme.colors.grey30}
`

const Icon_head = styled.img`
max-height: 2.6rem;
`

const Icon = styled.img`
width: 20px;
height: 20px;`