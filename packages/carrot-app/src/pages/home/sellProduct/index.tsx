import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TextInput from "@carrot/core/atoms/input/textInput";
import CheckBox from "@carrot/core/atoms/input/checkbox";
import HeaderTemplate from "../../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';

import theme from "@carrot/core/style/theme";
import Panel from "../../../components/panel";

import useGeolocation from "../../../hooks/location/useGeolocation";
import useSellProductViewModel from "./sellProduct.viewModel";

const SellProductPage = () => {
  const navigate = useNavigate();
  const geolocation = useGeolocation();

  const sellProductViewModel = useSellProductViewModel()

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
        <ProductInfoWrapper>
          <UploadPhoto>

          </UploadPhoto>
          <StyledTextInput
            placeholder="제목"
            disableBorder
            value={sellProductViewModel.title}
            onChange={e => sellProductViewModel.setTitle(e.target.value)}
          />
          <StyledPanel type="CUSTOM">
            카테고리 선택
          </StyledPanel>
          <PriceWrapper>
            <StyledTextInput
              placeholder='&#x20a9; 가격 (선택사항)'
              disableBorder
              value={sellProductViewModel.price}
              onChange={e => sellProductViewModel.setPrice(e.target.value)}
            />
            <StyledCheckBox onClick={() => sellProductViewModel.setShare(prev => !prev)}>
              나눔
            </StyledCheckBox>
          </PriceWrapper>
          <StyledTextInput
            placeholder={`${''}에 올릴 게시글 내용을 작성해주세요. (가품 및 판매금지 물품을 게시가 제한될 수 있어요)`}
            isMultiLine
            disableBorder
            noBorderBottom={true}
            value={sellProductViewModel.contents}
            onChange={e => sellProductViewModel.setContents(e.target.value)}
          />
        </ProductInfoWrapper>
        <AdditionalInfoWrapper>
          <WantedLocationPanel
            type='CUSTOM' 
            onClick={() => {
              geolocation(() => navigate('setwantedlocation'));              
            }
          }>
            거래 희망 장소
          </WantedLocationPanel>
        </AdditionalInfoWrapper>
        
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
  width: 100%;
  height: 100%;
  background: ${theme.colors.grey30};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const ProductInfoWrapper = styled.div`
  width: 100%;
  background: white;
  padding: 1.6rem;
`
const UploadPhoto = styled.div``
const StyledTextInput = styled(TextInput)<{ noBorderBottom?: boolean }>`
  border-bottom: ${props => props.noBorderBottom ? '' : `0.1rem solid ${theme.colors.grey20}`};
  
  input {
    padding: 0;

    ::placeholder {
      ${theme.typography.body2};
    }
  }

  textarea {
    padding: 0;
  }
  padding: 1rem 0;
`
const StyledPanel = styled(Panel)`
  border: none;
  padding: 0;
  border-bottom: 0.1rem solid ${theme.colors.grey20};

  span{
    font-weight: normal;
  } 
`
const PriceWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`
const StyledCheckBox = styled(CheckBox)`
  ${theme.typography.body2};
`
const AdditionalInfoWrapper = styled.div`
  background: white;
  height: 100%;
`
const WantedLocationPanel = styled(Panel)`
  border: none;

  span{
    font-weight: normal;
  } 
`