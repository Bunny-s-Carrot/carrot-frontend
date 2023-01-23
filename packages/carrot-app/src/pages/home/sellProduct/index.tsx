import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import TextInput from "@carrot/core/atoms/input/textInput";
import FileInput from "@carrot/core/atoms/input/fileInput";
import CheckBox from "@carrot/core/atoms/input/checkbox";
import HeaderTemplate from "../../../templates/headerTemplate";
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import cameraIcon from '@carrot/core/assets/icon/camera-filled.svg'
import cancelIcon from '@carrot/core/assets/icon/cancel.svg';

import theme from "@carrot/core/style/theme";
import Panel from "../../../components/panel";

import useGeolocation from "../../../hooks/location/useGeolocation";
import useSellProductViewModel from "./sellProduct.viewModel";
import Dropbox from "@carrot/core/atoms/dropdown";
import { category, categoryList, reverseCategoryList } from "../../../infra/category/categoryList";
import { getFrom } from "../../../infra/from";



const SellProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const geolocation = useGeolocation();

  const sellProductViewModel = useSellProductViewModel();
  const from = getFrom() || 'home';

  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <span>중고거래 글쓰기</span>
    </>
  
  const rightContent = 
    <Complete onClick={sellProductViewModel.handleClickSubmit}>완료</Complete>

  return (
    <HeaderTemplate
      leftContent={leftContent}
      onClickLeft={() => navigate(from)}
      rightContent={rightContent}
    >
      <Container>
        <ProductInfoWrapper>
          <ImgaeWrapper>
            <StyledFileInput
              accept="image/*"
              multiple
              onChange={sellProductViewModel.uploadImage}
            >
              <img src={cameraIcon} alt='cameraIcon' />
              <p><span>{sellProductViewModel.images.length}</span>/10</p>
            </StyledFileInput>
            <ThumbnailsWrapper>
              {sellProductViewModel.images.length > 0 &&
                sellProductViewModel.images.map((image, index) => (
                  <Thumbnail key={index}>
                    <img src={image.url} alt='uploadedImage'/>
                    <img
                      src={cancelIcon}
                      alt='cancelIcon'
                      onClick={() => sellProductViewModel.deleteImage(index)} />
                  </Thumbnail>
              ))}
            </ThumbnailsWrapper>
          </ImgaeWrapper> 
          <StyledTextInput
            placeholder="제목"
            disableBorder
            value={sellProductViewModel.title}
            onChange={e => sellProductViewModel.setTitle(e.target.value)}
          />
          <CategoryWrapper>
            <StyledPanel type="CUSTOM">
              {sellProductViewModel.classifId ? categoryList(sellProductViewModel.classifId) : '카테고리 선택'}
            </StyledPanel>
            <StyledDropbox type="CUSTOM" onChange={e =>
              sellProductViewModel.setClassifId(reverseCategoryList(e))}>
              {category && category.map((item, index) => (
                <option key={index}>{item.name}</option>)
              )}
            </StyledDropbox>
          </CategoryWrapper>
          
          <PriceWrapper>
            <PriceInputField filled={sellProductViewModel.price.length !== 0}>
              <span>&#x20a9;</span>
              <StyledTextInput
                placeholder='가격 (선택사항)'
                disableBorder
                inputType="number"
                value={sellProductViewModel.price}
                onChange={e => {
                  sellProductViewModel.price.length !== 0 && sellProductViewModel.setShare(false);
                  sellProductViewModel.setPrice(e.target.value)}}
              />
            </PriceInputField>
            
            <StyledCheckBox 
              onClick={() => {
                sellProductViewModel.share === false &&  sellProductViewModel.setPrice('0')
                sellProductViewModel.setShare((prev: boolean) => !prev)}
              }
              checked={sellProductViewModel.share === true}
              readOnly
            >
              나눔
            </StyledCheckBox>
          </PriceWrapper>
          <PriceSuggest>
            <StyledCheckBox
              checked={sellProductViewModel.priceSuggest === true}
              disabled={sellProductViewModel.price.length === 0 || sellProductViewModel.share}
              onClick={() => sellProductViewModel.price.length !== 0 && sellProductViewModel.setPriceSuggest((prev: boolean) => !prev)}
              readOnly
            >
                가격 제안받기
              </StyledCheckBox>
          </PriceSuggest>
          <StyledTextInput
            placeholder={`${sellProductViewModel.activeLocation}에 올릴 게시글 내용을 작성해주세요. (가품 및 판매금지 물품을 게시가 제한될 수 있어요)`}
            isMultiLine
            disableBorder
            noBorderBottom={true}
            value={sellProductViewModel.contents}
            onChangeValue={e => sellProductViewModel.setContents(e)}
          />
        </ProductInfoWrapper>
        <AdditionalInfoWrapper>
          <WantedLocationPanel
            type='CUSTOM' 
            onClick={() => {
              window.OpenMap.postMessage("HFROM 여끼따AAAAAAAAAAAAAAAAA")
              geolocation(() => navigate('setwantedlocation',
              { state: { from: location, data: {
                images: sellProductViewModel.images,
                title: sellProductViewModel.title,
                price: sellProductViewModel.price,
                contents: sellProductViewModel.contents,
                priceSuggest: sellProductViewModel.priceSuggest,
                share: sellProductViewModel.share,
                classifId: sellProductViewModel.classifId
               } } }));              
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
const ImgaeWrapper = styled.div`
  display: flex;
  padding-bottom: 1.2rem;
`
const StyledFileInput = styled(FileInput)`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border: 0.1rem solid ${theme.colors.grey40};
  border-radius: 0.4rem;
  background: ${theme.colors.grey20};
  ${theme.typography.body4};
  
  img {
    width: 2.2rem;
    height: 2.2rem;
  }

  span {
    color: ${theme.colors.carrot}
  }
`
const ThumbnailsWrapper = styled.div`
  width: calc(100% - 7rem);
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
const StyledTextInput = styled(TextInput)<{ noBorderBottom?: boolean }>`
  border-bottom: ${props => props.noBorderBottom ? '' : `0.1rem solid ${theme.colors.grey20}`};
  
  input {
    padding: 0;
    ${theme.typography.body3};

    ::placeholder {
      ${theme.typography.body3};
    }
  }

  textarea {
    padding: 0;
    ${theme.typography.body3};

    ::placeholder {
      ${theme.typography.body3};
    }
  }
  padding: 1rem 0;
`
const CategoryWrapper = styled.div`
  position: relative;
`
const StyledDropbox = styled(Dropbox)`
  position: absolute;
  top: 1.2rem;
  z-index: 1;
  opacity: 0;
`
const StyledPanel = styled(Panel)`
  border: none;
  padding: 0;
  border-bottom: 0.1rem solid ${theme.colors.grey20};

  span{
    ${theme.typography.body3};
    font-weight: normal;
  } 
`
const PriceWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`
const PriceInputField = styled.div<{ filled: boolean }>`
  display: flex;
  gap: 0.8rem;

  span: first-of-type {
    ${theme.typography.body3};
    align-self: center;
    color: ${props => props.filled ? '' : `${theme.colors.grey40}`};
  }
`
const StyledCheckBox = styled(CheckBox)<{ disabled?: boolean }>`
  ${theme.typography.body3};
  color: ${props => props.disabled ? `${theme.colors.grey40}` : ''};
`
const PriceSuggest = styled.div`
  padding: 1.6rem 0;
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