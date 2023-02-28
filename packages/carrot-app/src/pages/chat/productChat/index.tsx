import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components"
import chatApi from "../../../api/chat";
import useJwtDecode from "../../../hooks/auth/useJwtDecode";
import ChatRoom from "../../../components/chat/chatRoomList";
import { chatDateToSimple } from "@carrot/util/format";



const ProductChatPage = () => {
  const navigate = useNavigate();
  const { getId } = useJwtDecode();
  const userId = useMemo(() => getId(), [getId]);
  const { product_id } = useParams();
  const { data: chatRoomList, isSuccess: getChatRoomListSuccess } = useQuery([`chat/chatroom/${userId}`], () =>
  chatApi.getChatRoomByUserId(userId, product_id));
  const baseUrl = process.env.REACT_APP_FILE_BASE_URL;

  return (
    <Wrapper>
      {getChatRoomListSuccess && chatRoomList.map((value, index) => 
        <ChatRoom
          key={index}
          buyerName={value.displayName}              
          productImage={baseUrl + 'product/' + value.product_id.toString() + '/0.jpg'}
          location= {value.displayLoc}
          lastMessageDate={chatDateToSimple(value.recentTime)}
          lastMessage={value.recentMessage}
          onClick={() => navigate(`/chat/chatroom/${value.uuid}`, { state: {username: value.displayName} })}
        />
      )}
    </Wrapper>
  )
}

export default ProductChatPage

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 3.2rem;
`