import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useWebSocket from '../../../hooks/useWebSocket';
import chatApi from '../../../api/chat';
import useJwtDecode from '../../../hooks/auth/useJwtDecode';

const useChatRoomDetailViewModel = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [isOpenMore, openMore] = useState(false);
  const [exist, setExist] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const { chatRoom_id: roomId } = useParams();
  const { ws, isReady } = useWebSocket('http://localhost:5000');
  const { getId } = useJwtDecode();
  const uuid = location.state?.uuid || params.uuid;
  const seller_id = location.state?.sellerId;
  const product_id = location.state?.productId;

  const userId = useMemo(() => getId(), [getId]);
  const createChatRoom = useMutation(chatApi.createChatRoom);
  const createMessage = useMutation(chatApi.createMessage);

  const { data: chatRoomData, isSuccess: getChatRoomSuccess } = useQuery([`chat/chatroom/${uuid}`], () => 
    chatApi.getChatRoomByUuid(uuid))

  const { data: messages, isSuccess: getMessagesSuccess } = useQuery([`chat/chatroom/${uuid}/message`], () => 
    chatApi.getMessages(uuid))

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0rem'
      textAreaRef.current.style.height = 
      textAreaRef.current.scrollHeight / 10 + 'rem'
    }
  }, [textAreaRef, message])

  useEffect(() => {
    if (isReady) {
      ws.current?.on('connection', socket => {
        socket.join(roomId);
      })
    }
  }, [isReady, ws, roomId])

  useEffect(() => {
    if (getChatRoomSuccess) {
      chatRoomData && setExist(true)
    }
  }, [getMessagesSuccess, setExist, messages?.length])



  const handleClickMoreButton = () => {
    openMore(!isOpenMore);
  }

  const handleClickEmoji = () => {
    // emojiButtonClick
  }

  const sendMessage = () => {
    if (!exist) {
      createChatRoom.mutate({
        uuid,
        seller_id,
        buyer_id: userId,
        product_id,
      })
    }

    message !== '' && createMessage.mutate({
      chatroom_id: '12-33',
      message_id: 2,
      message_from: 33,
      message_to: 12,
      content: message,
      created_at: '시간'
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      }
    })
  }


  return {
    textAreaRef,
    message,
    setMessage,
    isOpenMore,
    messages,
    getMessagesSuccess,
    userId,
    handleClickMoreButton,
    sendMessage
  }
}

export default useChatRoomDetailViewModel