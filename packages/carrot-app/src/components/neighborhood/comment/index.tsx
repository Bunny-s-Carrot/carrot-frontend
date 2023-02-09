import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { useNavigate } from 'react-router-dom';
import { convertDateToSimple } from "@carrot/util/format";

interface CommentProps {
    comment_id: number;
    writer: string;
    location: string;
    created_at: any;
    comment: string;
    likes: number;
    depth: number;
    mother_id: number;
    isdetailpage: boolean;
    writersame: boolean;
}

const Comment = (props: CommentProps) => {
  const navigate = useNavigate();
  if (props.depth === 0 && !props.isdetailpage) {
    return (
      <Container>
        <Userinfo>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
          <div>
              <div className="writer">
                {props.writer}
                <WriterIcon true={props.writersame}>작성자</WriterIcon>
              </div>
              <div className="location">{props.location} · {convertDateToSimple(props.created_at)}</div>
          </div>
        </Userinfo>
        <Context>{props.comment}</Context>
        <Btns>
          <span>좋아요</span>
          <span 
            className="recom"
            onClick={() => navigate(window.location.pathname + `/comment/${props.comment_id}`)}
          >답글쓰기</span>
        </Btns>
      </Container>
    )
  } else if (props.depth === 0 && props.isdetailpage) {
    return (
      <Container>
        <Userinfo>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
          <div>
              <div className="writer">
                {props.writer}
                <WriterIcon true={props.writersame}>작성자</WriterIcon>
              </div>
              <div className="location">{props.location} · {convertDateToSimple(props.created_at)}</div>
          </div>
        </Userinfo>
        <Context>{props.comment}</Context>
        <Btns>
          <span>좋아요</span>
        </Btns>
      </Container>
    )
  } else {
    return (
      <SContainer>
        <SUserinfo>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
          <div>
              <div className="writer">
                {props.writer}
                <WriterIcon true={props.writersame}>작성자</WriterIcon>
              </div>
              <div className="location">{props.location} · {convertDateToSimple(props.created_at)}</div>
          </div>
        </SUserinfo>
        <SContext>{props.comment}</SContext>
        <SBtns>
          <span>좋아요</span>
        </SBtns>
      </SContainer>
    )
  } 
}

export default Comment;

const Container = styled.div`
padding: 7px 5px;
`

const Userinfo = styled.div`
font-size: 14px;
height: 40px;
display: flex;

.writer {
    font-weight: 500;
    margin: 5px 0 8.3px 0;
    display: flex;
    align-items: center;
}

.location {
    font-size: 11.5px;
    color: ${theme.colors.grey50};
}

img {
    width: 40px;
    height: 40px;
    padding: 3px;
    margin-right: 5px;
}
`

const WriterIcon = styled.div<{ true: boolean}>`
display: ${props => props.true ? 'block' : 'none'};
margin-left: 4px;
transform: translateY(-1px);
border: 1px solid ${theme.colors.grey50};
border-radius: 4px;
font-size: 10px;
color: ${theme.colors.grey50};
padding: 3px;
`

const Context = styled.div`
font-size: 15px;
padding: 6px 0 0 45px;
`

const Btns = styled.div`
font-size: 11.5px;
color: grey;
font-weight: 500;
padding: 10px 0 0 45px;

span {
    margin-right: 15px;
}
`

const SContainer = styled.div`
padding: 7px 0 7px 40px;
`

const SUserinfo = styled.div`
font-size: 14px;
height: 40px;
display: flex;

.writer {
    font-weight: 500;
    margin: 5px 0 7px 0;
    display: flex;
    align-items: center;
}

.location {
    font-size: 11.5px;
    color: ${theme.colors.grey50};
}

img {
    width: 30px;
    height: 30px;
    padding: 3px;
    margin-right: 5px;
}
`

const SContext = styled.div`
font-size: 15px;
padding: 6px 0 0 36px;
`

const SBtns = styled.div`
font-size: 11.5px;
color: grey;
font-weight: 500;
padding: 10px 0 0 36px;

span {
    margin-right: 15px;
}
`