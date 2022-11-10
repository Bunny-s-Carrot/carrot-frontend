import styled from "styled-components";

const topicListData = [
  {
    title: "같이해요",
    path: "",
  },
  {
    title: "동네소식",
    path: "",
  },
  {
    title: "동네질문",
    path: "",
  },
  {
    title: "동네맛집",
    path: "",
  },
  {
    title: "취미생활",
    path: "",
  },
  {
    title: "일상",
    path: "",
  },
  {
    title: "분실/실종센터",
    path: "",
  },
  {
    title: "동네사건사고",
    path: "",
  },
  {
    title: "해주세요",
    path: "",
  },
  {
    title: "동네사진전",
    path: "",
  },
];

const TopicBar = () => {
  return (
    <TopicContainer>
      {topicListData.map((item, index) => (
        <TopicItem key={index} onClick={() => console.log(index)}>
          <span>{item.title}</span>
        </TopicItem>
      ))}
    </TopicContainer>
  );
};
export default TopicBar;

const TopicContainer = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  border-bottom: 1px solid black;
`;

const TopicItem = styled.div`
  border: 1px solid black;
  width: fit-content;
  border-radius: 10px;
  text-align: center;
`;
