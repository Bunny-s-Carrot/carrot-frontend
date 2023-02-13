import NavBar from "../../components/navBar";
import HeaderTemplate from "../../templates/headerTemplate";
import notiIcon from '@carrot/core/assets/icon/notification.svg';
import useChatViewModel from "./chat.viewModel";
import ChatRoom from "../../components/chat/chatRoomList";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const chatViewModel = useChatViewModel();
  const navigate = useNavigate();
  const leftContent = 
    <div>채팅</div>

  const rightContent = 
    <>
      <img src={notiIcon} alt='notiIcon' />
    </>
  return (
    <>
      <HeaderTemplate
        leftContent={leftContent}
        rightContent={rightContent}
        onClickRight={() => {}}
      >
        <ChatRoom
          buyerName="부루스타"
          location='상암동'
          lastMessageDate="1주 전"
          lastMessage="하하하하하하"
          onClick={() => navigate('chatroom/1')}
        />
      </HeaderTemplate>
      <NavBar pageType='CHAT' />
    </>
  )
};

export default Chat;