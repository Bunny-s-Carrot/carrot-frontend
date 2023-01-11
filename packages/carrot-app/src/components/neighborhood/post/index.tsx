import styled from "styled-components";
import theme from '@carrot/core/style/theme';

interface PostProps {
  title: string;
  created_at: any;
}

const Post = (props: PostProps) => {
  return (
    <Container>
      <ContentWrapper>
        {props.title}
        {props.created_at}
      </ContentWrapper>
      <ImageWrapper>
        <img src="" alt="" />
      </ImageWrapper>
    </Container>
  );
};


export default Post;

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const ContentWrapper = styled.div`
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