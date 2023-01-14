import styled from "styled-components";
import theme from '@carrot/core/style/theme';
import { convertDateToSimple } from '../../../infra/format';

interface PostProps {
  title: string;
  location: string;
  created_at: any;
  category: string;
  onClick: () => void;
}

const Post = (props: PostProps) => {
  let Category=""
  if (props.category == "동네질문") {
    Category = "질문"
  } else if (props.category == "반짝모임") {
    Category = "반짝모임"
  } else if (props.category == "분실/실종") {
    Category = "분실/실종"
  } 

  let Loca;
  if (Category == "") {
    Loca = (<Loc>{props.location}</Loc>)
  } else {
    Loca = (<Loc> · {props.location}</Loc>)
  }

  return (
    <Container onClick={props.onClick}>
      <ContentWrapper>
        <Title>{props.title}</Title>
        <Sub>
          <Cate>{Category}</Cate>
          {Loca}
          <Time> · {convertDateToSimple(props.created_at)}</Time>
        </Sub>
      </ContentWrapper>
    </Container>
  );
};


export default Post;

const Container = styled.div`
  height: 70px;
  margin: 10px;
  border-bottom: 1px solid ${theme.colors.grey30};

`;

const ContentWrapper = styled.div`
padding-top: 5px;

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
const ImageWrapper = styled.div`
`
