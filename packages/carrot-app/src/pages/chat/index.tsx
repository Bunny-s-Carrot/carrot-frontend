import NavBar from "../../components/navBar";
import HeaderTemplate from "../../templates/headerTemplate";
import notiIcon from '@carrot/core/assets/icon/notification.svg';
import ChatRoom from "../../components/chat/chatRoomList";
import { useNavigate } from "react-router-dom";
import { chatDateToSimple } from '@carrot/util/format';
import useJwtDecode from "../../hooks/auth/useJwtDecode";
import { useMemo } from "react";
import chatApi from "../../api/chat";
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
  const { getId } = useJwtDecode();
  const userId = useMemo(() => getId(), [getId]);
  const { data: chatRoomList, isSuccess: getChatRoomListSuccess } = useQuery([`chat/chatroom/${userId}`], () =>
    chatApi.getChatRoomByUserId(userId));


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
        {getChatRoomListSuccess &&
          chatRoomList?.map((item, index) => 
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