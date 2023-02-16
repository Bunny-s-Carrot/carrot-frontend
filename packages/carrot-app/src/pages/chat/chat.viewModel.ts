import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query"
import useJwtDecode from "../../hooks/auth/useJwtDecode"
import chatApi from "../../api/chat";


const useChatViewModel = () => {
  const { getId } = useJwtDecode();
  const userId = useMemo(() => getId(), [getId]);
  const { data: chatRoomList, isSuccess: getChatRoomListSuccess } = useQuery([`chat/chatroom/${userId}`], () =>
    chatApi.getChatRoomByUserId(userId));

  return {
    chatRooms: chatRoomList,
    getChatRoomListSuccess,
  }
}

export default useChatViewModel;