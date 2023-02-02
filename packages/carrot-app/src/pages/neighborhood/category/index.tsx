import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import Post from "../../../components/neighborhood/post";
import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import usetopicViewModel from "./topicbar.viewModel";
import { postcategory } from "../../../infra/postcategory/postcategoryList";

const TopicBarDetailPage = () => {

  const navigate = useNavigate();
  const topicViewModel = usetopicViewModel();
  const results = topicViewModel.data?.payload;
  const categoryname = postcategory(useParams().classif_id);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerEl = container.current!;
    const scrollfunction = () => {
      const high = container.current?.scrollTop;
      if (high !== undefined) {
        setScrollTop(high);
      }
    }
    containerEl.addEventListener('scroll', scrollfunction);

    return () => {
      containerEl.removeEventListener('scroll', scrollfunction);
    }
  })

  return (
    <Container ref={container}>
      <Title scrollTop={scrollTop}>
        <div className="left">
          <img src={backIcon} alt="backIcon" onClick={() => navigate(-1)} />
          <Categoryname scrollTop={scrollTop}>{categoryname}</Categoryname>
        </div>
      </Title>
      <PostContainer className="pc" scrollTop={scrollTop}>
        <Top className="top" scrollTop={scrollTop}>
          <div className="top1">
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMTRfNjEg/MDAxNTczNjk0NDQ1Njg1.ngZvdPRL1BpgtvzpzKaoYpPvNbghef-eCIGEjjJNnlIg.fPwLwjKtnbAcVHm0yQ1X6tDCc3m1rF2PwSANfhSqonAg.JPEG.msinvestment/%EA%B3%A0%EA%B5%AC%EB%A7%88_%EC%82%AC%EC%A7%84_(8).jpg?type=w800"
              alt=""
            />
            <div>{categoryname}</div>
          </div>
          <Btn>참여중</Btn>
        </Top>
        {results?.map((item, index) => (
          <Post
            key={index}
            title={item.title}
            category={item.category_name}
            location={item.addr_name}
            created_at={item.created_at}
            onClick={() => navigate(`/post/${item.post_id}`)}
          />
        ))}
      </PostContainer>
    </Container>
  );
};

export default TopicBarDetailPage;

const Container = styled.div`
height: 100%;
overflow: scroll;
`

const Title = styled.div<{ scrollTop?: number }>`
  height: 9.2rem;
  background: ${props => props.scrollTop! >= 100 ? "white" : "none"};
  width: 100%;
  padding: 3.2rem 1.6rem 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  position: sticky;
  box-shadow: ${props => props.scrollTop! >=90 ? "0px 1px 10px -5px grey" : "none"};
  top: 0;
  border-bottom: ${props => props.scrollTop! >= 90 ? "0.1rem solid #E0E0E0" : "none"};

  .left {
    display: flex;
    ${theme.typography.body2};
    font-weight: bold;
    gap: 2rem;
  }
`

const Categoryname = styled.div<{ scrollTop?: number }>`
opacity: ${props => props.scrollTop! >= 90 ? 1 : 0};
`

const PostContainer = styled.div<{ scrollTop?: number }>`
  height: 100%;
  width: 100%;
`;

const Top = styled.div<{ scrollTop?: number }>`
  border-bottom: 9px solid ${theme.colors.grey20};
  padding: 5px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .5s ease-out;
  opacity: ${(props) => (props.scrollTop! > 1) ? 0 : 1};

  .top1 {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 13px;
    margin-right: 12px;
  }
`;

const Btn = styled.div`
  background: ${theme.colors.grey20};
  padding: 10px 18px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 400;
`;
