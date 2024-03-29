import { useState} from "react";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { useNavigate } from 'react-router-dom';
import { postcategoryList } from "../../../infra/postcategory/postcategoryList";
import closeIcon from "@carrot/core/assets/icon/close.svg";
import usePostViewModel from "../../../pages/neighborhood/post.viewModel";

interface Props {
  type: any;
  openModal: boolean;
  controlModal: any;
  optionClick?: any;
}

const PostModal = ({ type, openModal, controlModal, optionClick }: Props) => {
  const postViewModel = usePostViewModel();
  const navigate = useNavigate();
  const [orange, setOrange] = useState<number>(0);
  
  if (type === "TopicModal") {
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
            <p className="top2">
              주제에 참여하고 관심있는 게시글을 받아보세요.
            </p>
          </Top>
          <List>
            {postcategoryList.map((item, index) => {
              if (index > 2) {
                return <Topicitem key={index} onClick={() => navigate(`${item.path}`)}>{item.title}</Topicitem>;
              } else {
                return "";
              }
            })}
          </List>
        </Container>
      </Wrapper>
    );
  } else if (type === 'postdetail_w') {
    return (
      <Wrapper>
        <Background
          open={openModal}
          onClick={() => controlModal(false)}
        ></Background>
        <ContainerPW className={openModal ? "slideup" : "slidedown"}>
          <List>
            <Topicitem>공유하기</Topicitem>
            <Topicitem>수정</Topicitem>
            <Topicitem 
              onClick={optionClick}>삭제</Topicitem>
          </List>
        </ContainerPW>
      </Wrapper>
    );
  } else if (type === 'postdetail') {
    return (
      <Wrapper>
        <Background
          open={openModal}
          onClick={() => controlModal(false)}
        ></Background>
        <ContainerPW className={openModal ? "slideup" : "slidedown"}>
          <List>
            <Topicitem>공유하기</Topicitem>
            <Topicitem>게시물 신고</Topicitem>
            <Topicitem>이 사용자의 글 보지 않기</Topicitem>
          </List>
        </ContainerPW>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Background
          open={openModal}
          onClick={() => controlModal(false)}
        ></Background>
        <Container className={openModal ? "slideup" : "slidedown"}>
          <Topc>게시글의 주제를 선택해주세요.</Topc>
          <List>
            <div className="grey">기본 주제</div>
            {postcategoryList.map((item, index) => {
              if (index > 2) {
                return <Topicitem
                key={index} 
                className = {index === orange? 'orange' : 'black'}
                onClick={(e:any) => {
                  optionClick(e);
                  setOrange(index);
                }}
                >{index === orange ? `✓ ${item.title}` : `${item.title}`}</Topicitem>;
              } else {
                return "";
              }
            })}
          </List>
        </Container>
      </Wrapper>
    );
  }
};

export default PostModal;

const Wrapper = styled.div`
  .slideup {
    transition: all 0.6s;
    bottom: 0%;
  }

  .slidedown {
    bottom: -77%;
  }
`

const Background = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "" : "none")};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
`

const Container = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  height: 73%;
  padding-bottom: 1%;
  transform: translateY(1%);
  border-radius: 10px;
  left: 0;
  z-index: 15;
  display: flex;
  flex-direction: column;

  .grey {
    background: ${theme.colors.grey20};
    padding: 11px 14px;
    font-size: 15px;
    margin-bottom: 5px;
  }
`

const ContainerPW = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  height: 162px;
  padding-bottom: 1%;
  transform: translateY(1%);
  left: 0;
  z-index: 15;
  display: flex;
  flex-direction: column;

  .grey {
    background: ${theme.colors.grey20};
    padding: 11px 14px;
    font-size: 15px;
    margin-bottom: 5px;
  }
`

const Top = styled.div`
  font-size: 15px;
  border-bottom: 1px solid ${theme.colors.grey30};
  padding: 20px 14px 4.5px 14px;

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
    font-size: 16.5px;
    color: ${theme.colors.grey70};
    margin-bottom: 13px;
  }
`

const List = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  .orange {
    color : #ff6f00;
  }

  .black {
    color: black;
  }
`

const Topicitem = styled.div`
  font-size: 18px;
  padding: 18px 14px;
`

const Topc = styled.div`
  font-weight: 500;
  font-size: 21px;
  padding: 30px 14px 25px 14px;
`

