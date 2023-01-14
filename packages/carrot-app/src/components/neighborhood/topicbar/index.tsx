import styled from "styled-components";
import theme from '@carrot/core/style/theme';
import themeIcon from '@carrot/core/assets/icon/Dehaze.svg';
import boltIcon from '@carrot/core/assets/icon/Bolt.svg';

const topicListData = [
  {
    title: "주제",
    icon: themeIcon,
    path: ""
  },
  {
    title: "반짝모임",
    icon: boltIcon,
    path: ""
  },
  {
    title: "겨울간식",
    path: ""
  },
  {
    title: "동네소식",
    path: ""
  },
  {
    title: "동네질문",
    path: ""
  },
  {
    title: "동네맛집",
    path: ""
  },
  {
    title: "취미생활",
    path: ""
  },
  {
    title: "일상",
    path: ""
  },
  {
    title: "분실/실종센터",
    path: ""
  },
  {
    title: "동네사건사고",
    path: ""
  },
  {
    title: "해주세요",
    path: ""
  },
  {
    title: "동네사진전",
    path: ""
  },
];

const TopicBar = () => {
  return (
    <TopicContainer>

      {topicListData.map( (item, index) => {
        if (index <= 1) {
        return (
          <TopicItem key={index}>
          <Icon src={item.icon} />
          {item.title}
          </TopicItem>
          )} else {
          return (
          <TopicItem key={index}>
          {item.title}
          </TopicItem>
          )}
      })}
    </TopicContainer>
  );
};

export default TopicBar;


const TopicContainer = styled.div`
  height: 62px;
  border-bottom: 1px solid ${theme.colors.grey30};
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 7px 0 15px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TopicItem = styled.div`
display: inline-block;
font-size: 15px;
padding: 8px 9px;
margin-right: 8px;
border-radius: 16px;
border: 1px solid ${theme.colors.grey30};
display: flex;
align-items: center;
`

const Icon = styled.img`
width: 15px;
height: 15px;
margin-right: 3px;
padding-bottom: 2px;
`