import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import usePostDetailViewModel from "./[post_id].viewModel";
import HeaderTemplate from "../../../templates/headerTemplate";
import Comment from "../../../components/neighborhood/comment";
import Button from "../../../components/neighborhood/Btn";
import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import homeIcon from "@carrot/core/assets/icon/home-outline.svg";
import BellOffIcon from "@carrot/core/assets/icon/Notifications off.svg";
import ShareIcon from "@carrot/core/assets/icon/Share.svg";
import MoreIcon from "@carrot/core/assets/icon/More vert.svg";
import chatIcon from "@carrot/core/assets/icon/chat-outline-grey.svg";
import imageIcon from "@carrot/core/assets/icon/image-grey.svg";
import locationIcon from "@carrot/core/assets/icon/location-grey.svg";
import uparrowIcon from "@carrot/core/assets/icon/Arrow upward-white.svg";
import Swiper from "../../../components/swiper/swiper";
import Modal from "../../../components/neighborhood/modal";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";
import { convertDateToSimple } from "@carrot/util/format";

const PostDetailPage = () => {
  
  const navigate = useNavigate();
  const PostDetailViewModel = usePostDetailViewModel();
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;
  const results = PostDetailViewModel.data?.payload;
  const [heartnow, setHeartnow] = useState<boolean>(false);
  const [thumbnow, setThumbnow] = useState<boolean>(false);
  const [heartchange, setHeartchange] = useState(false);
  const [thumbchange, setThumbchange] = useState(false);
  const { getId } = useJwtDecode();

  let exist = true;
  let comment = results?.comment;
  if (comment === undefined) {
    comment = [];
    exist = false;
  };

  const [isOpenCommentbox, OpenCommentbox] = useState<boolean>(false);
  const postcommentRef = useRef<HTMLDivElement>(null);
  const precommentRef = useRef<HTMLDivElement>(null);
  const precommentRef1 = useRef<HTMLDivElement>(null);
  const commentinputRef = useRef<HTMLInputElement>(null);
  const [commentpreview, SetCommentpreview] = useState<boolean>(false);
  
  const handleCommentbox = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (isOpenCommentbox && !postcommentRef.current?.contains(target)) {
      OpenCommentbox(false);
    }

    if (e.target === precommentRef.current) {
      OpenCommentbox(true);
      setTimeout(() => commentinputRef.current?.focus(),1);
    } else if (e.target === precommentRef1.current) {
      OpenCommentbox(true)
      setTimeout(() => commentinputRef.current?.focus(),1);
    }
  }, [isOpenCommentbox])
  
  useEffect(() => {
    window.addEventListener('click', handleCommentbox);
    return () => {
      window.removeEventListener('click',handleCommentbox);
    }
  },[handleCommentbox])



  const [buttonvisible, setButtonvisible] = useState<boolean>(false);

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
      <img src={MoreIcon} alt="moreIcon" onClick={() => controlModal(true)}/>
    </>
  );

  const [openModal, setOpenModal] = useState(false);
  const controlModal = (props: boolean) => {
    setOpenModal(props);
  };

  return (
    <>
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
            <span>{results?.post.addr_name}</span>
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
          <ImageWrapper visible={results?.post.image}>
            {PostDetailViewModel.getImageSuccess &&
              <Swiper
                items={PostDetailViewModel.ImageData.names.map((item: string) => 
                  baseUrl + item
                )} 
              />
            }  
          </ImageWrapper>
          <Empa>{results?.empaAll !== 0 ? `공감 ${results?.empaAll} 조회` : "조회"} {results?.post.views}</Empa>
        </Content>
        <Buttons>
          <Button 
            type="empa"
            now={!thumbchange ? results?.empaOne : thumbnow}
            onClick={() => {
              if (!thumbchange) {
                setThumbchange(true);
                if (results?.empaOne) {
                  setThumbnow(false);
                  PostDetailViewModel.DownEmpa();
                } else {
                  setThumbnow(true);
                  PostDetailViewModel.UpEmpa();
                }
              } else {
                if (thumbnow) {
                  setThumbnow(false);
                  PostDetailViewModel.DownEmpa();
                } else {
                  setThumbnow(true);
                  PostDetailViewModel.UpEmpa();
                }
              }
            }} 
          />
          <Btn ref={precommentRef1}>
            <Icon src={chatIcon} />
            &nbsp; 댓글쓰기
          </Btn>
          <Button 
            type="heart"
            now={!heartchange ? results?.heart : heartnow}
            onClick={() => {
              if (!heartchange) {
                setHeartchange(true);
                if (results?.heart) {
                  setHeartnow(false);
                  PostDetailViewModel.Downheart();
                } else {
                  setHeartnow(true);
                  PostDetailViewModel.Upheart();
                }
              } else {
                if (heartnow) {
                  setHeartnow(false);
                  PostDetailViewModel.Downheart();
                } else {
                  setHeartnow(true);
                  PostDetailViewModel.Upheart();
                }
              }
          }}
        />
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
                 location={item.addr_name}
                 created_at={item.created_at}
                 comment={item.comment}
                 likes={item.likes}
                 depth={item.depth}
                 mother_id={item.mother_id}
                 writersame={item.writer_id === results?.user.user_id}
                 isdetailpage = {false}
                 />
              )
            }
          )}
        </CommentContainer>
        </Container>        
      </HeaderTemplate>
      <Bottom commentopen={isOpenCommentbox}>
      <img src={imageIcon} alt="" />
      <img src={locationIcon} alt="" />
      <Preinput ref={precommentRef} commentpreview={commentpreview}>
        {PostDetailViewModel.content.length === 0 ? '댓글을 입력해주세요.' : PostDetailViewModel.content}</Preinput>
</Bottom>
<WriteComment commentopen={isOpenCommentbox} ref={postcommentRef}>
  <form 
    id="content"
    onSubmit={(e) => {
      e.preventDefault();
      PostDetailViewModel.commmentSubmit();
    }}
    >
    <input 
      type="text" 
      placeholder='댓글을 입력해주세요.' 
      ref={commentinputRef}
      onChange={(e) => {
        PostDetailViewModel.setContent(e.target.value)
        if (e.target.value.length !== 0) {
          setButtonvisible(true);
          SetCommentpreview(true);
        } else {
          setButtonvisible(false);
          SetCommentpreview(false);
        }
        }}/>
  </form>
  <div className="sub">
    <Img src={imageIcon} alt="" />
    <Img src={locationIcon} alt="" />
    <SubmitBtn type="submit" form="content" visible={buttonvisible}>
      <img src={uparrowIcon} alt="" className='submitlogo'/>
    </SubmitBtn>
  </div>
  </WriteComment>
  <Modal
        type={results?.user.user_id === getId() ? 'postdetail_w' : 'postdetail'}
        openModal={openModal}
        controlModal={controlModal}
  />
</>
  );
};

export default PostDetailPage;

const Container = styled.div`
height: 100%;
overflow: scroll;
padding-bottom: 6.4rem;
`;

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

const ImageWrapper = styled.div<{ visible: number | undefined }>`
overflow: hidden;
border-radius: 10px;
width: 100%;
height: 230px;
margin-bottom: 15px;
display: ${props => props.visible === 1 ? 'block' : 'none'};

img {
  width: 100%;
  height: 100%;
}
`

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

const Btn = styled.div<{ now?:boolean }>`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  font-size: 12px;
  color: ${props => props.now ? '#f57f17' : '#9e9e9e'};
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
`;

const Nocomment = styled.div<{ comment: boolean }>`
padding: 35px 0 20px 0;
text-align: center;
font-size: 17.5px;
color: ${theme.colors.grey50};
line-height: 24px;
display: ${props => props.comment? 'none' : 'block'};
`;

const Bottom = styled.div<{ commentopen: boolean }>`
width: 100%;
height: 6.4rem;
padding: 0 4px; 
background: white;
position: absolute;
bottom: 0;
border-top: 1px solid ${theme.colors.grey30};
display: ${props => props.commentopen ? 'none' : 'flex'};
align-items: center;

img {
  padding: 7px;
  width: 40px;
  height: 40px;
}
`;

const Preinput = styled.div<{ commentpreview: boolean }>`
  background: ${theme.colors.grey20};
  color: ${props => props.commentpreview ? "black" : '#9e9e9e'};
  font-size: 18px;
  padding: 13px 14px;
  border-radius: 20px;
  width: calc(100% - 80px);
  margin: 0 4px;
`

const WriteComment = styled.div<{ commentopen: boolean }>`
background: white;
height: 11rem;
border-top: 1px solid ${theme.colors.grey40};
position: sticky;
bottom: ${props => props.commentopen ? 0 : "-11rem"};
z-index: 10;
border-radius: 10px;
padding: 6px;
display: ${props => props.commentopen ? 'block' : 'none'};

input {
  width: 100%;
  height: 4.6rem;
  border: none;
  padding: 0 5px;
  font-size: 18px;
  caret-color: #ff6f00;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${theme.colors.grey40};
    font-size: 18px;
  }
}

.sub {
  height: 6.4rem;
  display: flex;
  align-items: center;
  padding: 0 4px;
}
`

const Img = styled.img`
width: 40px;
height: 40px;
padding: 7px;`

const SubmitBtn = styled.button<{ visible: boolean }>`
  background: #ff6f00;
  border-radius: 30px;
  position: absolute;
  right: 13px;
  width: 36px;
  height: 36px;
  display: ${props => props.visible? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
    
  .submitlogo {
    width: 17px;
    height: 17px;
  }
`