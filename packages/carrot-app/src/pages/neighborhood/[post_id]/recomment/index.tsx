import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import usePostDetailViewModel from "../[post_id].viewModel";
import HeaderTemplate from '../../../../templates/headerTemplate';
import Comment from "../../../../components/neighborhood/comment";
import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import imageIcon from "@carrot/core/assets/icon/image-grey.svg";
import locationIcon from "@carrot/core/assets/icon/location-grey.svg";
import uparrowIcon from "@carrot/core/assets/icon/Arrow upward-white.svg";






const RecommentPage = () => {
    const commentId = parseInt(useParams().comment_id!);

    const navigate = useNavigate();
    const PostDetailViewModel = usePostDetailViewModel();
    const results = PostDetailViewModel.data?.payload;
    let exist = true;
    let comment = results?.comment;
    if (comment === undefined) {
      comment = [];
      exist = false;
    };

    const [isOpenCommentbox, OpenCommentbox] = useState<boolean>(false);
    const [commentpreview, SetCommentpreview] = useState<boolean>(false);
    const [buttonvisible, setButtonvisible] = useState<boolean>(false);
    const postcommentRef = useRef<HTMLDivElement>(null);
    const precommentRef = useRef<HTMLDivElement>(null);
    const commentinputRef = useRef<HTMLInputElement>(null);

    const handleCommentbox = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpenCommentbox && !postcommentRef.current?.contains(target)) {
        OpenCommentbox(false);
      }
      if (e.target === precommentRef.current) {
        OpenCommentbox(true);
      }
    }

    useEffect(() => {
      window.addEventListener('click', handleCommentbox);
      return () => {
        window.removeEventListener('click', handleCommentbox)
      }
    })

    
    const leftContent = (
      <>
        <img src={backIcon} alt="backIcon" />
        <div>답글쓰기</div>
      </>
    )

    return (
        <HeaderTemplate 
          leftContent={leftContent}
          onClickLeft={() => navigate(-1)}
        >
          <Container>
            {comment.map((item, index) => {
              if (commentId === item.mother_id) {
                return (
                    <StyledComment 
                      key={index}
                      comment_id={item.comment_id}
                      writer={item.name}
                      location={item.addr_name}
                      created_at={item.created_at}
                      comment={item.comment}
                      likes={item.likes}
                      depth={item.depth}
                      mother_id={item.mother_id}
                      isdetailpage={true}
                    />
                )
              } else return null
            })}
          </Container>
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
                PostDetailViewModel.recommmentSubmit();
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
        </HeaderTemplate>
    )
}

export default RecommentPage;

const Container = styled.div`
height: 100%;
overflow: scroll;
`;

const StyledComment = styled(Comment)`
.recom {
    color: red;
}
`

const Bottom = styled.div<{ commentopen: boolean }>`
width: 100%;
height: 6.4rem;
padding: 0 4px; 
background: white;
position: sticky;
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