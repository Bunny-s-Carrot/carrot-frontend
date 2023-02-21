import styled from "styled-components"
import theme from "@carrot/core/style/theme"
import defaultProfile from '@carrot/core/assets/img/profile-default.svg'
import sampleImage from '@carrot/core/assets/img/sample.jpg'

interface ChatRoomProps {
  profileImage?: string
  buyerName: string
  location: string
  lastMessage: string
  lastMessageDate: string
  productImage?: string
  onClick: () => void
}

const ChatRoom = (props: ChatRoomProps) => {
  return (
    <Wrapper onClick={props.onClick}>
      <ProfileImage>
        <img src={props.profileImage || defaultProfile} alt='profileImage'/>
      </ProfileImage>
      <ChatInfoWrapper>
        <ChatOpponentInfo>
          <div>
            <OpponentName>
              {props.buyerName}
            </OpponentName>
            <LocationAndLastMessageDate>
              {props.location} · {props.lastMessageDate}
            </LocationAndLastMessageDate>
          </div>
        </ChatOpponentInfo>
        <LastMessage>
          {props.lastMessage}
        </LastMessage>
      </ChatInfoWrapper>
      <ProductImage>
        <img src={props.productImage || sampleImage} alt='productImage' />
      </ProductImage>
    </Wrapper>
  )
}

export default ChatRoom

const Wrapper = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid ${theme.colors.grey30};
  padding:1.6rem;
  gap: 1.6rem;
`

const ProfileImage = styled.div`
  flex: 0 0 4.6rem;
  width: 4.6rem;
  height: 4.6rem;
  object-fit: cover;
  border-radius: 50%;

  img {
    width: 100%;
    height 100%;
    object-fit: cover;
  }
`
const ChatInfoWrapper = styled.div`
  width: calc(100% - 7.8rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ChatOpponentInfo = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    gap: 0.6rem;
  }
`
const OpponentName = styled.span`
  ${theme.typography.body3};
  font-weight: bold;
`
const LocationAndLastMessageDate = styled.span`
  color: ${theme.colors.grey50};
  ${theme.typography.caption1};
  align-self: center;
`
const LastMessage = styled.div`
  ${theme.typography.body3};
`
const ProductImage = styled.div`
  flex: 0 0 4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
  overflow: hidden;

  img {
    max-width: 150%;
    max-height: 150%;
    object-fit: cover;

  }
`