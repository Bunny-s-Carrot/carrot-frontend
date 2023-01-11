import styled from "styled-components";
import theme from '@carrot/core/style/theme';

//(11월 10일)우선은 테스트용으로 데이터를 받아왔다는 전제하에, postListData를 채워놓음
const postListData = [
  {
    title: "홍제동 주변에 아시안 마켓있나요?",
    content: "",
    topic: "",
    location: "홍제동",
    time: "48분 전"
  },
  {
    title: "1시쯤 이태원 쏭타이 가실분?",
    content: "",
    topic: "반짝모임",
    location: "동교동",
    time: "1시간 전"
  },
  {
    title: "대입 준비하시는 분 계신가요?",
    content: "",
    topic: "",
    location: "창천동",
    time: "3시간 전"
  },
  {
    title: "무료 타로 한번 갈께요~ 선착순1명?",
    content: "",
    topic: "반짝모임",
    location: "연희동",
    time: "5시간 전"
  }
];

const Post = () => {
  return (
    <PostContainer>
      {postListData.map((item, index) => (
        <PostItem key={index}>
          <div>{item.title}</div>
          <div>
            <Sub1>{item.topic}</Sub1>
            <Sub2>{item.location}</Sub2>
            <Sub2>{item.time}</Sub2>
          </div>
        </PostItem>
      ))}
    </PostContainer>
  );
};


export default Post;

const PostContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const PostItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.grey30};
  padding: 10px;
  font-size: 15px;
`;

const Sub1 = styled.span`
color: ${theme.colors.blue}
`

const Sub2 = styled.span`
color: ${theme.colors.grey50};`