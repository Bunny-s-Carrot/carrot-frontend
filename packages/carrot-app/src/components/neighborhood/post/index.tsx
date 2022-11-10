// 서버DB로 부터 post list를 받아와서 postListData에 저장함
// 사용자가 페이지를 밑으로 넘기면(스크롤하면) 한번 더 데이터를 받아와 push함

import styled from "styled-components";

//(11월 10일)우선은 테스트용으로 데이터를 받아왔다는 전제하에, postListData를 채워놓음
const postListData = [
  {
    topic: "",
    prefix: "",
    title: "",
    contents: "",
    gatheringData: {
      personNum: "3명",
      gender: "여성",
      age: null,
      date: null,
      location: "연남동",
    },
    writerId: "",
    writerLocation: "",
    time: "",
  },
  {
    topic: "동네질문",
    prefix: "Q.",
    title:
      "홍대 근처 주류점 다 돌았는데 산토리 위스키 없더라구요. 어디서 구할 수 있을까요..?",
    contents: "",
    gatheringData: {},
    writerId: "testId",
    writerLocation: "연희동",
    time: "",
  },
  {
    topic: "동네맛집",
    prefix: "",
    title:
      "홍대입구 역 근처 브로우바, 브로우바 리프트! 속눈썹 펌 샵 추천합니다 :) 홍대입구역 경의선산책거리 쪽에 있는 알앤리쉬에요:) 후기보시면 아시겠지만 원장님 짱짱 잘합니다",
    contents: "",
    gatheringData: {},
    writerId: "testId2",
    writerLocation: "연남동",
    time: "",
  },
  {
    topic: "같이해요",
    prefix: "모집중",
    title: "같이 롤드컵보실분~!",
    contents: "같이 모여서 응원해요!! ",
    gatheringData: {
      personNum: "4명",
      gender: null,
      age: "20~30세",
      date: "내일",
      location: "연남동",
    },
    writerId: "testId3",
    writerLocation: "연남동",
    time: "",
  },
];

const Post = () => {
  return (
    <PostContainer>
      {postListData.map((item, index) => (
        <PostItem key={index} onClick={() => console.log(index)}>
          <div>{item.topic}</div>
          <span>
            {item.title.length < 75
              ? item.prefix + " " + item.title
              : item.prefix + " " + item.title.substring(0, 70) + "...더보기"}
          </span>
          <span>{item.contents}</span>
          <div>
            {Object.keys(item.gatheringData).length === 0 ? (
              ""
            ) : (
              <div>
                <span>{item.gatheringData.personNum}</span>
                <span>{item.gatheringData.gender}</span>
                <span>{item.gatheringData.personNum}</span>
                <span>{item.gatheringData.date}</span>
                <span>{item.gatheringData.location}</span>
              </div>
            )}
          </div>
          <div>
            <span>{item.writerId}</span>
            <span>{item.writerLocation}</span>
            <span>{item.time}</span>
          </div>
        </PostItem>
      ))}
    </PostContainer>
  );
};
export default Post;

const PostContainer = styled.div`
  width: 100%;
`;

const PostItem = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 10px;
  font-size: 15px;
`;
