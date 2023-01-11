import styled from "styled-components";
import SalesTemplate from "../../../templates/salesTemplate"

import backIconWhite from '@carrot/core/assets/icon/back_arrow_white.svg';
import homeIconWhite from '@carrot/core/assets/icon/home_outline_white.svg';
import logo from '@carrot/core/assets/img/logo.png'
const ProductDetailPage = () => {

  const leftContent = 
    <LeftContentWrapper>
      <img src={backIconWhite} alt='backIcon' />
      <img src={homeIconWhite} alt='homeIcon' />
    </LeftContentWrapper>

  return (
    <SalesTemplate
      pageType="HOME"
      leftContent={leftContent}
    >
      <Container>
        <ImageWrapper>
          <img src={logo} alt='product-image' />
        </ImageWrapper>
        <ContentWrapper>
          <SellerInfo>

          </SellerInfo>
          <MainContent>
            <ContentHeader>

            </ContentHeader>
            <ContentBody>

            </ContentBody>
          </MainContent>
        </ContentWrapper>
      </Container>
    </SalesTemplate>
  )
}

export default ProductDetailPage;

const LeftContentWrapper = styled.div`
  display: flex;
  align-items: center;

  img:first-of-type {
    width: 75%;
    height: 75%;
  }
`
const Container = styled.div`
  overflow-y: scroll;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 35rem;
  object-fit: contain;

  img {
    width: 100%;
    height: 100%;
  }
`
const ContentWrapper = styled.div`
  padding: 1.6rem;
`
const SellerInfo = styled.div``
const MainContent = styled.div``
const ContentHeader = styled.div``
const ContentBody = styled.div` `