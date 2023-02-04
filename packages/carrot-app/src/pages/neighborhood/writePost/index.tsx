import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import HeaderTemplate from "../../../templates/headerTemplate";
import Panel from "../../../components/panel";
import backIcon from "@carrot/core/assets/icon/back-arrow.svg";
import cancelIcon from '@carrot/core/assets/icon/cancel.svg';
import useWritePostViewModel from "./writePost.viewModel";
import usePostViewModel from "../post.viewModel";
import Modal from "../../../components/neighborhood/modal";
import FileInput from "@carrot/core/atoms/input/fileInput";
import { reversePostcategory } from '../../../infra/postcategory/postcategoryList';
import { text } from 'node:stream/consumers';

const WritePostPage = () => {
  const navigate = useNavigate();
  const writePostViewModel = useWritePostViewModel();
  const PostViewModel = usePostViewModel();
  const locationnow = PostViewModel.activeLocation;
  const inputquery = `${locationnow} 관련된 질문이나 이야기를 해보세요.`

  const leftContent = (
    <>
      <img src={backIcon} alt="backIcon" onClick={() => navigate(-1)} />
      <Head>동네생활 글쓰기</Head>
    </>
  );

  const rightContent = (
    <>
      <Done type="submit" form="content">
        완료
      </Done>
    </>
  );

  const [openModal, setOpenModal] = useState(false);
  const controlModal = (props: boolean) => {
    setOpenModal(props);
  };

  useEffect(() => {
    controlModal(true);
  }, []);

  const [categorynow, setCategorynow] = useState(null);
 
  const optionClick = (e: any) => {
    setCategorynow(e.target.innerHTML)
    controlModal(false);
    writePostViewModel.setCategory(reversePostcategory(e.target.innerHTML));
  }

  const textarea = useRef<HTMLTextAreaElement>(null);
  textarea.current?.addEventListener('keyup', () => {
    let height = textarea.current!.scrollHeight;
    textarea.current!.style.height = `${height}px`
  })

  return (
    <>
      <StyledHeaderTemplate leftContent={leftContent} rightContent={rightContent}>
        <StyledPanel 
          type="CUSTOM" 
          onClick={() => controlModal(true)}
          >
            {categorynow === null ? '게시글의 주제를 선택해주세요' : categorynow }
        </StyledPanel>
        <form
          id="content"
          onSubmit={(e) => {
            e.preventDefault();
            writePostViewModel.handleClickSubmit();
          }}
        >
          <Content
            name="content"
            ref={textarea}
            placeholder={inputquery}
            onChange={(e) => writePostViewModel.setContent(e.target.value)}
          />
          <ThumbnailsWrapper>
              {writePostViewModel.images.length > 0 &&
                writePostViewModel.images.map((image, index) => (
                  <Thumbnail key={index}>
                    <img src={image.url} alt='uploadedImage'/>
                    <img
                      src={cancelIcon}
                      alt='cancelIcon'
                      onClick={() => writePostViewModel.deleteImage(index)} />
                  </Thumbnail>
              ))}
            </ThumbnailsWrapper>
        </form>
      </StyledHeaderTemplate>
      <Modal
        type="CategoryModal"
        openModal={openModal}
        controlModal={controlModal}
        optionClick={optionClick}
      />
      <Bottom>
        <FileInput
          accept="image/*"
          multiple
          onChange={writePostViewModel.uploadImage}>
          사진
        </FileInput>
      </Bottom>
    </>
    
  );
};

export default WritePostPage;

const StyledHeaderTemplate = styled(HeaderTemplate)`
#content {
  margin-bottom: 5rem;
}
`

const Head = styled.span`
  font-size: 21px;
  margin-left: 6px;
`;

const Done = styled.button`
  font-size: 18px;
`;

const StyledPanel = styled(Panel)`
  span {
    font-size: 16.5px;
    font-weight: 300;
    margin-left: -14px;
  }

  img {
    width: 11px;
  }

  width: 94%;
  margin: 0 3%;
`;

const Content = styled.textarea`
  width: 100%;
  height: auto;
  border: none;
  padding: 18px 13px;
  font-size: 16.5px;

  ::placeholder {
    color: ${theme.colors.grey50};
  }

  :focus {
    outline: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Bottom = styled.div`
background: white;
border-top: 1px solid ${theme.colors.grey30};
width: 100%;
height: 5rem;
position: absolute;
bottom: 0;
z-index: 11;
display: flex;
align-items: center;

span {
  font-size: 18px;
  background: skyblue;
  margin: 10px;
  padding: 10px;
}
`

const ThumbnailsWrapper = styled.div`
  width: 100%;
  height: 10rem;
  padding: 0.8rem 1.4rem;
  display: flex;
  gap: 1.4rem;
  overflow-x: scroll;
  ${theme.option.hiddenScroll};
`
const Thumbnail = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
  flex-shrink: 0;
  background: ${theme.colors.grey10};
  border-radius: 0.4rem;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;

    :last-of-type {
      position: absolute;
      top: -0.6rem;
      right: -0.6rem;
      z-index: 10;
      width: 2rem;
      height: 2rem;
      background: white;
      border-radius: 50%;
    }
  }
`