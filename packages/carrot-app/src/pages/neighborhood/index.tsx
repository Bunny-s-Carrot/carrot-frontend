import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar";

import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from "../../templates/headerTemplate";
import TopicBar from "../../components/neighborhood/topicbar";
import Post from "../../components/neighborhood/post";
import FloatingButton from "../../components/floatingButton";
import PostModal from "../../components/neighborhood/modal";

import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import searchIcon from "@carrot/core/assets/icon/search.svg";
import profileIcon from "@carrot/core/assets/icon/profile.svg";
import notiIcon from "@carrot/core/assets/icon/notification.svg";

import usePostViewModel from "./post.viewModel";

const Neighborhood = () => {
  const navigate = useNavigate();
  const postViewModel = usePostViewModel();
  const results = postViewModel.data?.payload;
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;

  let LeftContent = (
    <Locationdiv>
      <p>{postViewModel.activeLocation}</p>
      <img className="down" src={backIcon} alt="backIcon" />
    </Locationdiv>
  );

  const RightContent = (
    <>
      <img src={searchIcon} alt="searchIcon" />
      <img src={profileIcon} alt="profileIcon" />
      <img src={notiIcon} alt="notiIcon" />
    </>
  );

  const [openModal, setOpenModal] = useState(false);
  const controlModal = (props: boolean) => {
    setOpenModal(props);
  };

  return (
    <>
      <HeaderTemplate
        leftContent={LeftContent}
        onClickLeft={() => {
          navigate("/setLocation");
        }}
        rightContent={RightContent}
      >
        <TopicBar controlModal={controlModal} />
        <PostContainer>
          {results?.map((item, index) => (
            <Post
              thumbnail={baseUrl + 'post/' + item.post_id.toString() + '/0.jpg'}
              key={index}
              title={item.title}
              category={item.category_name}
              location={item.addr_name}
              created_at={item.created_at}
              comment={item.chat}
              thumb={item.empa}
              image={item.image}
              onClick={() => navigate(`/post/${item.post_id}`)}
            />
          ))}
        </PostContainer>
      </HeaderTemplate>
      <FloatingButton pageType="NEIGHBORHOOD" />
      <NavBar pageType="NEIGHBORHOOD" />
      <PostModal
        type="TopicModal"
        openModal={openModal}
        controlModal={controlModal}
      />
    </>
  );
};

export default Neighborhood;

const Locationdiv = styled.div`
  padding: 0.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  &:hover {
    background: ${theme.colors.grey30};
    cursor: pointer;
  }
`;

const PostContainer = styled.div`
  margin-bottom: 6.4rem;
`;
