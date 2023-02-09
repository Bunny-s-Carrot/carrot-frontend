import styled from "styled-components";
import theme from '@carrot/core/style/theme';
import { convertDateToSimple } from '@carrot/util/format';
import thumbgreyIcon from "@carrot/core/assets/icon/Thumb-grey.svg";
import chatIcon from "@carrot/core/assets/icon/chat-outline-grey.svg";

interface PostProps {
  thumbnail?: string;
  title: string;
  location: string;
  created_at: any;
  category: string;
  comment: number;
  thumb: number;
  image: number;
  onClick: () => void;
}

const Post = (props: PostProps) => {
  let Category=""
  if (props.category === "동네질문") {
    Category = "질문"
  } else if (props.category === "반짝모임") {
    Category = "반짝모임"
  } else if (props.category === "분실/실종") {
    Category = "분실/실종"
  } 

  let Loca;
  if (Category === "") {
    Loca = (<Loc>{props.location}</Loc>)
  } else {
    Loca = (<Loc> · {props.location}</Loc>)
  }

  return (
    <Container onClick={props.onClick}>
      <ContentWrapper>
        <Left imageexist={props.image}>
          <Title>{props.title}</Title>
          <Sub>
            <Cate>{Category}</Cate>
            {Loca}
            <Time> · {convertDateToSimple(props.created_at)}</Time>
          </Sub>
        </Left>
        <Thumbnail src={props.thumbnail} exist={props.image}/>
      </ContentWrapper>
      <BottomWrapper commentcount={props.comment} thumbcount={props.thumb}>
        <Comments count={props.comment}>
          <img src={chatIcon} alt="" />
          {props.comment}&ensp;
        </Comments>
        <Thumbs count={props.thumb}>
          <img src={thumbgreyIcon} alt="" />
          {props.thumb}&ensp;
        </Thumbs>
      </BottomWrapper>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  margin: 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.grey30};
`

const ContentWrapper = styled.div`
display: flex;
height: 66px;
box-sizing: border-box;
`

const Left = styled.div<{ imageexist: number }>`
padding: 10px 0 0 3px;
width: ${props => props.imageexist === 0 ? '100%' : 'calc(100% - 60px)'};
`

const Title = styled.div`
font-size: 18px;
padding: 5px 0;
font-weight: 400;
`

const Sub = styled.div`
padding: 5px 0;
font-size: 12.5px;
`

const Cate = styled.span`
color: ${theme.colors.blue};
`

const Loc = styled.span`
color: ${theme.colors.grey50};
`

const Time = styled.span`
color: ${theme.colors.grey50}
`

const Thumbnail = styled.img<{ exist: number }>`
border: 0.5px solid ${theme.colors.grey40};
border-radius: 5px;
margin-top: 10px;
width: 56px;
height: 56px;
display: ${props => [props.exist === 1 ? 'block' : 'none']};

img {
  width: 100%;
  height: 100%;
}
`

const BottomWrapper = styled.div<{ commentcount: number, thumbcount: number}>`
height: 15px;
padding: 0 0 0 3px;
font-size: 14px;
display: ${props => props.commentcount === 0 && props.thumbcount === 0 ? 'none' : 'flex'};
color: ${theme.colors.grey70};

img {
  width: 15px;
  height: 15px;
  margin-right: 2px;
}
`

const Comments = styled.div<{ count: number }>`
display: ${props => props.count !== 0 ? 'flex' : 'none'};
`

const Thumbs = styled.div<{ count: number }>`
display: ${props => props.count !== 0 ? 'flex' : 'none'};
`