import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { convertDateToSimple } from "@carrot/util/format";

interface CommentProps {
    comment_id: number;
    writer: string;
    location: string;
    created_at: any;
    comment: string;
    likes: number;
    depth: number;
}

const Comment = (props: CommentProps) => {
    return (
        <Container>
          <Userinfo>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
            <div>
                <div className="writer">{props.writer}</div>
                <div className="location">{props.location} · {convertDateToSimple(props.created_at)}</div>
            </div>
          </Userinfo>
          <Context>{props.comment}</Context>
          <Btns>
            <span>좋아요</span>
            <span>답글쓰기</span>
          </Btns>
        </Container>
    )
  }


export default Comment;

const Container = styled.div`
padding: 7px 5px;`

const Userinfo = styled.div`
font-size: 14px;
height: 40px;
display: flex;

.writer {
    font-weight: 500;
    margin: 5px 0 7px 0;
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
}`

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
}`