import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Input from "@carrot/core/atoms/input/textInput";
import HeaderTemplate from "../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';

import theme from "@carrot/core/style/theme";

const SellProductPage = () => {
  const navigate = useNavigate();
  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <span>중고거래 글쓰기</span>
    </>
  
  const rightContent = 
    <Complete>완료</Complete>
  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(-1)}
      rightContent={rightContent}
    >
      <Container>
        <UploadPhoto>

        </UploadPhoto>
        <TitleInput
          placeholder="제목"
          disableBorder
        />
      </Container>
    </HeaderTemplate>
  )
}

export default SellProductPage;

const Complete = styled.span`
  color: ${theme.colors.carrot};
  ${theme.typography.body3};
`
const Container = styled.div`
`
const UploadPhoto = styled.div``
const TitleInput = styled(Input)``