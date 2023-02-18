import NavBar from "../../components/navBar";
import HeaderTemplate from "../../templates/headerTemplate";
import notiIcon from '@carrot/core/assets/icon/notification.svg';
import useChatViewModel from "./chat.viewModel";
import ChatRoom from "../../components/chat/chatRoomList";
import { useNavigate } from "react-router-dom";
import { chatDateToSimple } from '@carrot/util/format';

const Chat = () => {
  const chatViewModel = useChatViewModel();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;

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
        {chatViewModel.getChatRoomListSuccess &&
          chatViewModel.chatRooms?.map((item, index) => 
            <ChatRoom
              key={index}
              buyerName={item.displayName}              
              productImage={baseUrl + 'product/' + item.product_id.toString() + '/0.jpg'}
              location= {item.displayLoc}
              lastMessageDate={chatDateToSimple(item.recentTime)}
              lastMessage={item.recentMessage}
              onClick={() => navigate(`chatroom/${item.uuid}`, { state: {username: item.displayName} })}
            />
          )        
        }
      </HeaderTemplate>
      <NavBar pageType='CHAT' />
    </>
  )
};

export default Chat;