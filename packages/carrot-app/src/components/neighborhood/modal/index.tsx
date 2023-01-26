import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { postcategoryList } from "../../../infra/postcategory/postcategoryList";
import closeIcon from "@carrot/core/assets/icon/close.svg";

import usePostViewModel from "../../../pages/neighborhood/post.viewModel";

interface Props {
  openModal: boolean;
  controlModal: any;
}

const TopicModal = ({ openModal, controlModal }: Props) => {
  const postViewModel = usePostViewModel();

  return (
    <Wrapper>
      <Background
        open={openModal}
        onClick={() => controlModal(false)}
      ></Background>
      <Container className={openModal ? "slideup" : "slidedown"}>
        <Top>
          <div className="top1">
            <p>{postViewModel.activeLocation} 주제 목록</p>
            <img
              src={closeIcon}
              alt="closeIcon"
              onClick={() => controlModal(false)}
            />
          </div>
          <p className="top2">주제에 참여하고 관심있는 게시글을 받아보세요.</p>
        </Top>
        <List>
          {postcategoryList.map((item, index) => {
            if (index != 0) {
              return <Topicitem key={index}>{item.title}</Topicitem>;
            }
          })}
        </List>
      </Container>
    </Wrapper>
  );
};

export default TopicModal;

const Wrapper = styled.div`
  .slideup {
    transition: all 0.6s;
    bottom: -5%;
  }

  .slidedown {
    bottom: -77%;
  }
`;

const Background = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "" : "none")};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  height: 72%;
  border-radius: 10px;
  padding: 13px;
  left: 0;
  z-index: 10;
  margin-bottom: 5%;
`;

const Top = styled.div`
  font-size: 15px;
  border-bottom: 1px solid ${theme.colors.grey30};

  .top1 {
    font-weight: 500;
    font-size: 21px;
    margin: 5px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .top2 {
    font-size: 15px;
    color: ${theme.colors.grey70};
    margin-bottom: 13px;
  }
`;

const List = styled.div`
  height: 540px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Topicitem = styled.div`
  font-size: 18px;
  padding: 20px 0;
`;
