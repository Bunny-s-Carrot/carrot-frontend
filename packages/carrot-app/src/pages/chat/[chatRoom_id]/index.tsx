import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "@carrot/core/style/theme";
import { converHexToRGB } from "@carrot/util/color";
import { colorAndEmoji } from '../../../infra/mannerTemp/colorAndEmoji'
import HeaderTemplate from "../../../templates/headerTemplate"
import backIcon from '@carrot/core/assets/icon/back-arrow.svg';
import dotsVerticalIcon from '@carrot/core/assets/icon/dots-vertical.svg';
import callIcon from '@carrot/core/assets/icon/call-outline.svg';
import addIcon from '@carrot/core/assets/icon/add-grey.svg';
import closeIcon from '@carrot/core/assets/icon/close-grey.svg';
import TextInput from "@carrot/core/atoms/input/textInput";
import smileIcon from '@carrot/core/assets/icon/smile-grey.svg';
import sendIcon from '@carrot/core/assets/icon/send-grey.svg';
import sendIconActive from '@carrot/core/assets/icon/send-carrot.svg';
import useChatRoomDetailViewModel from "./chatRoomDetail.viewModel";
import MyChat from "../../../components/chat/myChat";
import OpponentChat from "../../../components/chat/opponentChat";
import { MessageDto } from "../../../api/chat/chatDto";

const ChatRoomDetailPage = () => {

  const chatRoomDetailViewModel = useChatRoomDetailViewModel();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;
  const userId = chatRoomDetailViewModel.userId;
  const fontColor = colorAndEmoji(37);
  const rgb = converHexToRGB(fontColor[0]);

  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <div>
        <span>{username}</span>
        <MannerTemp color={fontColor[0]} rgb={rgb}>36.5°C</MannerTemp>
      </div>
    </>

  const rightContent = 
    <>
      <img src={callIcon} alt='callIcon' />
      <img src={dotsVerticalIcon} alt='dotsVerticalIcon' />
    </>


  return (

    <HeaderTemplate
      leftContent={leftContent}
      rightContent={rightContent}
      onClickLeft={() => navigate(-1)}
    >
      <Wrapper>
        <MessageWrapper>
          {chatRoomDetailViewModel.getMessagesSuccess &&
            chatRoomDetailViewModel.messages?.map((message: MessageDto, index: number, messages) => {
              const previousMessage =
                index > 1 ? messages[index - 1] : ('' as unknown) as MessageDto
              const nextMessage = 
                index < messages.length ? messages[index + 1] : ('' as unknown) as MessageDto
              if (userId === message.message_from) {
                return (
                  <div key={index}>
                  {previousMessage.created_at?.split('.')[2] !==
                  (message.created_at.split('.')[2]) && (
                  <DateSeparator>
                    <DateWrapper>
                      <span>
                        {message.created_at.slice(0, 12)}
                      </span>
                    </DateWrapper>
                  </DateSeparator>
                  )}
                  <MyChat
                    message={message.content}
                    createdAt={message.created_at}
                    hideTime={
                      nextMessage && nextMessage.message_from === message.message_from && 
                      nextMessage.created_at?.split(':')[1] ===
                      message.created_at.split(':')[1]
                    }
                    scroll={
                      index === chatRoomDetailViewModel.messages!.length - 1
                        ? chatRoomDetailViewModel.scrollBottom
                        : undefined
                    }
                  />
                  </div>
                )
              } else return (
                <div key={index}>
                  {previousMessage.created_at?.split('.')[2] !==
                  (message.created_at.split('.')[2]) && (
                  <DateSeparator>
                    <DateWrapper>
                      <span>
                      {message.created_at.slice(0, 12)}
                      </span>
                    </DateWrapper>
                  </DateSeparator>
                  )}
                  <OpponentChat
                    message={message.content}
                    createdAt={message.created_at}
                    hideTime={
                      nextMessage && nextMessage.message_from === message.message_from &&
                      nextMessage.created_at?.split(':')[1] ===
                      message.created_at.split(':')[1]
                    }
                    scroll={
                      index === chatRoomDetailViewModel.messages!.length - 1
                        ? chatRoomDetailViewModel.scrollBottom
                        : undefined
                    }
                  />
                </div>
              )
            })
          }
          <div ref={chatRoomDetailViewModel.scrollRef} />
        </MessageWrapper>
        <BottomWrapper>
        <MoreButton
          src={chatRoomDetailViewModel.isOpenMore ? closeIcon : addIcon}
          alt='addIcon'
          onClick={chatRoomDetailViewModel.handleClickMoreButton}
        />
        <ChatInputWrapper>
          <ChatInput
            value={chatRoomDetailViewModel.message}
            onChange={(e) => {
              chatRoomDetailViewModel.setMessage(e.target.value)
            }}
            isMultiLine
            placeholder="메시지 보내기"
            disableBorder
            rows={1}
            ref={chatRoomDetailViewModel.textAreaRef}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (!e.shiftKey) {
                  e.preventDefault()
                  chatRoomDetailViewModel.sendMessage()
                }
              }
            }}
          />
          <img
            src={smileIcon}
            alt='smileIcon'
            onClick={() => {}}
          />
        </ChatInputWrapper>
          <SendButton
            src={chatRoomDetailViewModel.message.length === 0 ? sendIcon : sendIconActive}
            alt='sendIcon'
            onClick={() => {
              chatRoomDetailViewModel.sendMessage()
            }}
          />
        </BottomWrapper>
      </Wrapper>
    </HeaderTemplate>
  )
}

export default ChatRoomDetailPage

const MannerTemp = styled.span<{ color: string, rgb: { r: number, g: number, b: number } | null }>`
  ${theme.typography.caption1}
  padding: 0.4rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  color: ${props => props.color};
  border-radius: 1.6rem;
  background: ${props => `rgba(${props.rgb!.r}, ${props.rgb!.g}, ${props.rgb!.b}, 0.3)`};
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const MessageWrapper = styled.div`
  flex: 1 1 calc(100% - 5.2rem);
  overflow-y: scroll;
  padding: 1.6rem 1.6rem 0 1.6rem;
  ${theme.option.hiddenScroll}
`
const BottomWrapper = styled.div`
  background: white;
  width: 100%;
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`
const MoreButton = styled.img`
  width: 2rem;
  height: 2rem;
`
const ChatInputWrapper = styled.div`
  width: 100%;
  background: ${theme.colors.grey20};
  min-height: 3.6rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;

  img {
    margin-right: 1.4rem;
    width: 2.2rem;
    height: 2.2rem;
  }
`
const ChatInput = styled(TextInput)`
  display: flex;

  textarea {
    align-self: center;
    max-height: 8rem;
    line-height: 2rem;
    background: transparent;
    ::placeholder {
      line-height: 2rem;
    }
  }
`
const SendButton = styled.img`
  width: 2.6rem;
  height: 2.6rem;
`
const DateSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0;
`
const DateWrapper = styled.div`
  width: 12rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.grey30};
  border-radius: 2rem;
  span {
    color: white;
    ${theme.typography.caption1};
  }
`