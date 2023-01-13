import styled from "styled-components";
import theme from '@carrot/core/style/theme';

interface PostProps {
  title: string;
  location: string;
  created_at: any;
}

const Post = (props: PostProps) => {
  return (
    <Container>
      <ContentWrapper>
        <Title>{props.title}</Title>
        <Sub>
          <Loc>{props.location}</Loc>
          <Time>{props.created_at}</Time>
        </Sub>
      </ContentWrapper>
      <ImageWrapper>
        <img src="" alt="" />
      </ImageWrapper>
    </Container>
  );
};


export default Post;

const Container = styled.div`
  height: 70px;
  margin: 10px;
  border-bottom: 1px solid ${theme.colors.grey30}

`;

const ContentWrapper = styled.div`
`
const Title = styled.div`
font-size: 17px;
padding: 5px 0;
font-weight: 450;
`

const Sub = styled.div`
padding: 3px 0;
font-size: 11px;
`

const Loc = styled.span`
color: ${theme.colors.grey50};
margin-right: 5px;
`

const Time = styled.span`
color: ${theme.colors.grey50}
`
const ImageWrapper = styled.div`
`



// const PostItem = styled.div`
//   width: 100%;
//   border-bottom: 1px solid ${theme.colors.grey30};
//   padding: 10px;
//   font-size: 15px;
// `;

// const Sub1 = styled.span`
// color: ${theme.colors.blue}
// `

// const Sub2 = styled.span`
// color: ${theme.colors.grey50};`