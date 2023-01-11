import theme from "@carrot/core/style/theme";
import styled from "styled-components";
import searchIcon from '@carrot/core/assets/icon/search.svg'
import heartIcon from '@carrot/core/assets/icon/heart-grey.svg'
import chatIcon from '@carrot/core/assets/icon/chat-outline-grey.svg'
import { convertDateToSimple } from "../../infra/format";

interface ProductProps {
  title: string;
  seller_location: string;
  price: number;
  created_at: any;
  chat?: number;
  heart?: number;
  onClick: () => void;
}

const Product = (props: ProductProps) => {
  return (
    <Container onClick={props.onClick}>
      <ImageWrapper>
        <img src={searchIcon} alt='search' />
      </ImageWrapper>
      <ContentWrapper>
        <TitleWrapper>
          <span>{props.title}</span>
        </TitleWrapper>
        <LocationAndCreatedAt>
          <span>{props.seller_location} · {convertDateToSimple(props.created_at)}</span>
        </LocationAndCreatedAt>
        <Price>
          <span>{props.price.toLocaleString()}원</span>
        </Price>
        <ChatAndHeartCount>
          {(props.chat && props.chat > 0) &&
            <div>
              <img src={chatIcon} alt='chatIcon' />
              <span>{props.chat}</span>
            </div>}
            {(props.heart && props.heart > 0) &&
            <div>
              <img src={heartIcon} alt='chatIcon' />
              <span>{props.heart}</span>
            </div>}
        </ChatAndHeartCount>
      </ContentWrapper>
    </Container>
  )
}
  


export default Product

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1.6rem 0;
  display: flex;
  gap: 1.6rem;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
`
const ImageWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  border: 0.5px solid ${theme.colors.grey30};
  border-radius: 0.4rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const ContentWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.8rem;
`
const TitleWrapper = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${theme.typography.body3};
  line-height: 1.8rem;
`
const LocationAndCreatedAt = styled.div`
  font-size: 1.3rem;
  color: ${theme.colors.grey50};
`
const Price = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`
const ChatAndHeartCount = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.6rem;

  div {
    display: flex;
    gap: 0.1rem;
  }

  img {
    width: 1.8rem;
    height: 1.8rem;
  }

  span {
    font-size: 1.6rem;
    color: ${theme.colors.grey70};
    align-self: center;
  }
`