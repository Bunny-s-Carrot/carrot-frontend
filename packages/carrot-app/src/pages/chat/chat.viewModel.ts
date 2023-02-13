import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query"
import useJwtDecode from "../../hooks/auth/useJwtDecode"
import chatApi from "../../api/chat";


const useChatViewModel = () => {
  const { getId } = useJwtDecode();
  const userId = useMemo(() => getId(), [getId]);
  const { data: messageList, isSuccess: getMessageListSuccess } = useQuery([`chat/chatroom/${userId}`], () =>
    chatApi.getChatRoomByBuyerId(userId));

  return {
    messageList,
    getMessageListSuccess,
  }
}

export default useChatViewModel;