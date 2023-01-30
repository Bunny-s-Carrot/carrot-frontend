import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import usePostDetailViewModel from "./[post_id].viewModel";
import HeaderTemplate from "../../../templates/headerTemplate";
import Comment from "../../../components/neighborhood/comment";
import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import homeIcon from "@carrot/core/assets/icon/home-outline.svg";
import BellOffIcon from "@carrot/core/assets/icon/Notifications off.svg";
import ShareIcon from "@carrot/core/assets/icon/Share.svg";
import MoreIcon from "@carrot/core/assets/icon/More vert.svg";
import thumbIcon from "@carrot/core/assets/icon/Thumb.svg";
import heartIcon from "@carrot/core/assets/icon/heart-grey.svg";
import chatIcon from "@carrot/core/assets/icon/chat-outline-grey.svg";
import { convertDateToSimple } from "@carrot/util/format";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const PostDetailViewModel = usePostDetailViewModel();
  const results = PostDetailViewModel.data?.payload;
  let exist = true;
  let comment = results?.comment;
  if (comment === undefined) {
    comment = [];
    exist = false;
  };

  
  const leftContent = (
    <>
      <IconHead src={backIcon} alt="backIcon" />
      <IconHead src={homeIcon} alt="homeIcon" />
    </>
  );

  let rightContent = (
    <>
      <img src={BellOffIcon} alt="bellonIcon" />
      <img src={ShareIcon} alt="shareIcon" />
      <img src={MoreIcon} alt="moreIcon" />
    </>
  );

  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(-1)}
      rightContent={rightContent}
    >
      <Container>
        <Category>
          <Color>{results?.post.category_name}</Color>
        </Category>
        <UserInfo>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            alt=""
          />
          <div>
            <p>{results?.user.name}</p>
            <span>{results?.user.lowest_sect_name}</span>
            <span>
              {" "}
              · {convertDateToSimple(results?.post.created_at)}
            </span>
          </div>
        </UserInfo>
        <Content>
          {results?.post.content}
          <br />
          <br />
          <Empa>조회 {results?.post.views}</Empa>
        </Content>
        <Buttons>
          <Btn>
            <Icon src={thumbIcon} />
            &nbsp; 공감하기
          </Btn>
          <Btn>
            <Icon src={chatIcon} />
            &nbsp; 댓글쓰기
          </Btn>
          <Btn>
            <Icon src={heartIcon} />
            &nbsp; 관심
          </Btn>
        </Buttons>
        <CommentContainer comment={exist}>
          <Nocomment comment={exist}>
            아직 댓글이 없어요.<br/>
            가장 먼저 댓글을 남겨보세요.
          </Nocomment>
          {comment.map((item, index) => {
            return (
              <Comment 
               key={index}
               comment_id={item.comment_id}
               writer={item.name}
               location={item.lowest_sect_name}
               created_at={item.created_at}
               comment={item.comment}
               likes={item.likes}
               depth={item.depth}
               />
            )
          })}
        </CommentContainer>
      </Container>
    </HeaderTemplate>
  );
};

export default PostDetailPage;

const Container = styled.div``;

const Category = styled.div`
  padding: 15px 8px;
`;

const Color = styled.span`
  background: ${theme.colors.grey20};
  border-radius: 3px;
  font-size: 12px;
  padding: 4px;
`;

const UserInfo = styled.div`
  height: 50px;
  display: flex;

  img {
    margin: 7px;
    width: 36px;
    height: 36px;
  }

  div {
    font-size: 14px;
    margin-left: 3px;
  }

  p {
    margin: 9px 0 5px 0;
    font-weight: 500;
  }

  span {
    color: ${theme.colors.grey50};
  }
`;

const Content = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  border-bottom: 1px solid ${theme.colors.grey30};
  white-space: pre-line;
`;

const Empa = styled.p`
  color: ${theme.colors.grey50};
  font-size: 13px;
`;

const Buttons = styled.div`
  border-bottom: 1px solid ${theme.colors.grey30};
  color: ${theme.colors.grey70};
  display: flex;
  align-items: center;
`;

const Btn = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  font-size: 12px;
`;

const IconHead = styled.img`
  max-height: 2.6rem;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const CommentContainer = styled.div<{ comment: boolean }>`
height: ${props => props.comment? 'auto' : '15rem'};
border-bottom: 7.5px solid${theme.colors.grey20};
padding: 10px 0 15px 0;
`

const Nocomment = styled.div<{ comment: boolean }>`
padding: 35px 0 20px 0;
text-align: center;
font-size: 17.5px;
color: ${theme.colors.grey50};
line-height: 24px;
display: ${props => props.comment? 'none' : 'block'};
`