import { useMemo } from "react";
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
import Modal from "../../../components/modal";


const ProductDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getId } = useJwtDecode();
  const userId = useMemo(() => getId(), [getId]);
  const productDetailViewModel = useProductDetailViewModel();
  const productData = useMemo(() => productDetailViewModel.data && productDetailViewModel.data.product, [productDetailViewModel.data]);
  const sellerData = useMemo(() => productDetailViewModel.data && productDetailViewModel.data.seller, [productDetailViewModel.data]);
  const popupRef = productDetailViewModel.popupRef;
  const dotsRef = productDetailViewModel.dotsRef;
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;
  const lat = useMemo(() => productDetailViewModel.isSuccess && JSON.parse(productData?.wanted_location as string).lat, [productData?.wanted_location, productDetailViewModel.isSuccess]);
  const lng = useMemo(() => productDetailViewModel.isSuccess && JSON.parse(productData?.wanted_location as string).lng, [productData?.wanted_location, productDetailViewModel.isSuccess]);
  const uuid = useMemo(() => productData?.product_id.toString()! + productData?.seller_id.toString()! + userId, [productData?.product_id, productData?.seller_id, userId])
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
    <ChatButton
      buttonType="CARROT"
      onClick={() => {
        if (productData?.seller_id !== userId) {
          navigate(`/chat/chatroom/${uuid}`,
        {
          state: { sellerId: productData?.seller_id, productId: productData?.product_id, uuid }
        }
          )
        }
      }
      }
    >
      {productData?.seller_id === userId ? `대화 중인 채팅방` : '채팅하기'}
    </ChatButton>

  return (
    <>
    <SalesTemplate
      pageType="HOME"
      leftContent={leftContent}
      rightContent={rightContent}
      onClickLeft={() => navigate(-1)}
      bottomLeftContent={bottomLeftContent}
      bottomRightContent={bottomRightContent}
      isHeartOn={productDetailViewModel.isHeartOn}
      onClickHeart={productDetailViewModel.handleClickHeart}
    > 
      {productDetailViewModel.isOpenPopup &&
        <SmallPopup
          ref={popupRef}
          content={
            productDetailViewModel.data?.product.seller_id === userId
            ? [{text:'게시글 수정'},
               {text: '끌어올리기'},
               {text: '숨기기'},
               {text: '삭제', onClick: () => productDetailViewModel.openModal(true)}]
            : [{text: '신고하기'},
               {text: '이 사용자의 글 보지 않기'}]
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
        {
          productData &&
          <ContentWrapper>
            <SellerInfoWrapper>
              <div>
                <ProfileImage>
                </ProfileImage>
                <SellerInfo>
                  <p>{sellerData?.name}</p>
                  <span>{location.state?.locationName}</span>
                </SellerInfo>
              </div>
              <div>
                {sellerData?.manner_temp &&
                  <MannerTemp value={sellerData?.manner_temp} type='SMALL'/>}
              </div>
            </SellerInfoWrapper>
            <div>
              <ContentHeader>
                <p>{productData?.title}</p>
                <span onClick={() => {}}>
                  {productData?.classif_id && 
                  categoryList(productData?.classif_id)}
                </span>
                <span>
                  {' · '} 
                  {convertDateToSimple(productData?.created_at)}
                  </span>
              </ContentHeader>
              <ContentBody>
                <p>
                  {productData?.contents}
                </p>
                <span>
                  {productData?.chat > 0 
                    ? `채팅 ${productData?.chat}`
                    : ''
                  }
                  {(productDetailViewModel.data!.product.chat > 0 &&
                  productDetailViewModel.data!.product.heart > 0)
                    ? ' · '
                    : ''
                  }
                  {productData?.heart > 0 
                    ? `관심 ${productData?.heart}`
                    : ''
                  }
                  {(productData?.heart > 0 &&
                  productData?.views > 0)
                    ? ' · '
                    : ''
                  }
                  {productData?.views > 0
                    ? `조회 ${productData?.views}`
                    : ''
                  }
                </span>
              </ContentBody>
            </div>
          </ContentWrapper>
        }
        
        {(lat && lng)
        ? 
          <Panel
            type='WANTED_LOCATION'
            lat={lat}
            lng={lng}
            onClick={() => navigate('wantedlocation',
            {
              state: { lat, lng},
            })}
          />
        : <></>
        }
        <Panel type='REPORT' />
        <Panel type='SELLING' sellerName={sellerData?.name}/>
      </Container>
    </SalesTemplate>
    {productDetailViewModel.isOpenModal &&
    <Modal 
      query='정말 삭제하시겠습니까?'
      onClickLeft={() => {productDetailViewModel.openModal(false)}}
      onClickRight={() => {productDetailViewModel.deleteProduct.mutate({
        product_id: productDetailViewModel.data!.product.product_id,

      },
      {
        onSuccess: () => navigate('/home')
      }
      )}}
      buttonText='삭제'
    />}
    </>
    
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
  height: 3.2rem;
  ${theme.typography.body4};
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