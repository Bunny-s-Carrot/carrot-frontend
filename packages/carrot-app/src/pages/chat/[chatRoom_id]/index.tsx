import { useEffect, useRef, useState } from "react";
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
import SellerChat from "../../../components/chat/sellerChat";
import io, { Socket } from 'socket.io-client'

const ChatRoomDetailPage = () => {

  const ws = useRef<Socket>();
  useEffect(() => {
    ws.current = io('http://localhost:5000');
    ws.current.on('connect', () => {
      console.log("Connected with ID: ", ws.current!.id);
    })

    ws.current?.emit('message', 'Hello World');

    return () => {
      ws.current?.disconnect();
    }

  });

  const chatRoomDetailViewModel = useChatRoomDetailViewModel();

  const fontColor = colorAndEmoji(37);
  const rgb = converHexToRGB(fontColor[0]);

  const leftContent = 
    <>
      <img src={backIcon} alt='backIcon' />
      <div>
        <span>상대방 닉네임</span>
        <MannerTemp color={fontColor[0]} rgb={rgb}>36.5°C</MannerTemp>
      </div>
    </>

  const rightContent = 
    <>
      <img src={callIcon} alt='callIcon' />
      <img src={dotsVerticalIcon} alt='dotsVerticalIcon' />
    </>

  return (
    <>
      <HeaderTemplate
        leftContent={leftContent}
        rightContent={rightContent}
      >
        <MessageWrapper>
          <MyChat
            createdAt="2022-07-16T16:10"
          />
          <MyChat />
          <SellerChat />
        </MessageWrapper>
      </HeaderTemplate>
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
          onClick={chatRoomDetailViewModel.sendMessage}
        />
      </BottomWrapper>
    </>
  )
}

export default ChatRoomDetailPage

const MannerTemp = styled.span<{ color: string, rgb: { r: number, g: number, b: number } | null }>`
  ${theme.typography.caption1}
  padding: 0.4rem;
  margin-left: 0.4rem;
  vertical-align: middle;
  color: ${props => props.color};
  border-radius: 1.6rem;
  background: ${props => `rgba(${props.rgb!.r}, ${props.rgb!.g}, ${props.rgb!.b}, 0.3)`};
`
const MessageWrapper = styled.div`
  position: relative;
  padding: 1.6rem;
`
const BottomWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
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