import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SalesTemplate from "../../../templates/salesTemplate"

import { categoryList } from "../../../infra/category/categoryList";

import backIconWhite from '@carrot/core/assets/icon/back-arrow-white.svg';
import homeIconWhite from '@carrot/core/assets/icon/home-outline-white.svg';
import shareIconWhite from '@carrot/core/assets/icon/Share-white.svg';
import dotsVerticalIconWhite from '@carrot/core/assets/icon/dots-vertical-white.svg';

import useProductDetailViewModel from "./[product_id].viewModel";
import theme from "@carrot/core/style/theme";
import Panel from "../../../components/panel";
import Button from "@carrot/core/atoms/button";
import MannerTemp from "../../../components/mannerTemp";
import { convertDateToSimple } from "@carrot/util/format";
import Swiper from "../../../components/swiper/swiper";
import SmallPopup from "../../../components/popup/small";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";

const ProductDetailPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { getId } = useJwtDecode();
  const productDetailViewModel = useProductDetailViewModel();
  const popupRef = productDetailViewModel.popupRef;
  const dotsRef = productDetailViewModel.dotsRef;
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;


  const leftContent = 
    <>
      <img src={backIconWhite} alt='backIcon' />
      <img src={homeIconWhite} alt='homeIcon' />
    </>

  const rightContent = 
    <>
      <img src={shareIconWhite} className='size-down' alt='shareIcon' />
      <img
        src={dotsVerticalIconWhite}
        alt='dotsVerticalIcon'
        ref={dotsRef}
        onClick={productDetailViewModel.handleOpenPopup}
      />
    </>

  const bottomLeftContent = 
    <BottomLeftContentWrapper isAbleNego={productDetailViewModel.data?.product.price_suggest === 1}>
      <span>{productDetailViewModel.data?.product.price.toLocaleString()}원</span>
      <span>
        {productDetailViewModel.data?.product.price_suggest === 0
        ? '가격 제안 불가'
        : '가격 제안하기'}
      </span>
    </BottomLeftContentWrapper>

  const bottomRightContent = 
    <ChatButton buttonType="CARROT" onClick={() => {}}>채팅하기</ChatButton>

  return (
    <SalesTemplate
      pageType="HOME"
      leftContent={leftContent}
      rightContent={rightContent}
      onClickLeft={() => navigate(-1)}
      bottomLeftContent={bottomLeftContent}
      bottomRightContent={bottomRightContent}
    > 
      {productDetailViewModel.isOpenPopup &&
        <SmallPopup
          ref={popupRef}
          content={
            productDetailViewModel.data?.product.seller_id === getId()
            ? ['게시글 수정', '끌어올리기', '숨기기', '삭제']
            : ['신고하기', '이 사용자의 글 보지 않기']
          }
        />
      }

      <Container>
        <ImageWrapper>
          {productDetailViewModel.getImageSuccess &&
            <Swiper
              items={productDetailViewModel.imageData.names.map((item: string) => 
                baseUrl + item
              )} 
            />
          }          
        </ImageWrapper>
        <ContentWrapper>
          <SellerInfoWrapper>
            <div>
              <ProfileImage>
              </ProfileImage>
              <SellerInfo>
                <p>{productDetailViewModel.data?.user.name}</p>
                <span>{location.state?.locationName}</span>
              </SellerInfo>
            </div>
            <div>
              {productDetailViewModel.data?.user.manner_temp &&
                <MannerTemp value={productDetailViewModel.data?.user.manner_temp} type='SMALL'/>}
            </div>
          </SellerInfoWrapper>
          <div>
            <ContentHeader>
              <p>{productDetailViewModel.data?.product.title}</p>
              <span onClick={() => {}}>
                {productDetailViewModel.data?.product.classif_id && 
                categoryList(productDetailViewModel.data?.product.classif_id)}
              </span>
              <span>
                {' · '} 
                {convertDateToSimple(productDetailViewModel.data?.product.created_at)}
                </span>
            </ContentHeader>
            <ContentBody>
              <p>
                {productDetailViewModel.data?.product.contents}
              </p>
              <span>
                {productDetailViewModel.data?.product.chat && 
                productDetailViewModel.data?.product.chat > 0 && 
                `채팅 ${productDetailViewModel.data?.product.chat}`}
                {productDetailViewModel.data?.product.heart && 
                productDetailViewModel.data?.product.heart > 0 && 
                ` · 관심 ${productDetailViewModel.data?.product.heart}`}
                {productDetailViewModel.data?.product.views && 
                productDetailViewModel.data?.product.views > 0 && 
                ` · 조회 ${productDetailViewModel.data?.product.views}`}
              </span>
            </ContentBody>
          </div>
        </ContentWrapper>
        <Panel type='WANTED_LOCATION' />
        <Panel type='REPORT' />
        <Panel type='SELLING' sellerName={productDetailViewModel.data?.user.name}/>
      </Container>
    </SalesTemplate>
  )
}

export default ProductDetailPage;


const BottomLeftContentWrapper = styled.div<{ isAbleNego: boolean }>`
  display: flex;
  flex-direction: column;

  span: first-of-type {
    ${theme.typography.body3};
    font-weight: bold;
  }

  span: last-of-type {
    ${theme.typography.body4};
    font-weight: bold;
    color: ${props => props.isAbleNego ? theme.colors.carrot : theme.colors.grey70};
    text-decoration: ${props => props.isAbleNego ? 'underline' : ''};
  }
`
const ChatButton = styled(Button)`
  width: 8.8rem;
  height: 3.6rem;
  ${theme.typography.body3};
  font-weight: bold;
  border-radius: 0.4rem;
  align-self: center;
`
const Container = styled.div`
  padding-bottom: 1.6rem;
  overflow-y: scroll;
  ${theme.option.hiddenScroll};
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 35rem;
`
const ContentWrapper = styled.div`
  padding: 1.6rem 1.6rem 0 1.6rem ;
`
const SellerInfoWrapper = styled.div`
  width: 100%;
  height: 8rem;
  padding: 1.6rem 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  
  > div {
    display: flex;
    gap: 1rem;
  }
`
const ProfileImage = styled.div`
  width: 4rem;
  height: 4rem;
  background: black;
  border-radius: 50%;
`
const SellerInfo = styled.div`
  ${theme.typography.body4};  
  line-height: 2rem;

  p {
      font-size: 1.6rem;
      font-weight: bold;
    }
`
const ContentHeader = styled.div`
  padding: 2.6rem 0;

  p {
    ${theme.typography.heading3};
  }

  span {
    font-size: 1.4rem;
    line-height: 2.6rem;
    color: ${theme.colors.grey70};
    align-self: center;
  
  :first-of-type {
    text-decoration: underline;
  }
  }
`
const ContentBody = styled.div`
  
  white-space:pre-line;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  gap: 4rem;
  border-bottom: 0.1rem solid ${theme.colors.grey30};

  p {
    ${theme.typography.body2};
  }

  span {
    font-size: 1.4rem;
    color: ${theme.colors.grey40};
  }
`