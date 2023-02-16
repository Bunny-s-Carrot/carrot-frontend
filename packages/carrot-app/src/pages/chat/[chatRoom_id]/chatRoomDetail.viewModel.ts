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
  const [receivedMessage, setReceivedMessage] = useState('');
  const [isOpenMore, openMore] = useState(false);
  const [exist, setExist] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const { ws, isReady } = useWebSocket('http://localhost:5000', params.uuid);
  const { getId } = useJwtDecode();
  const uuid = location.state?.uuid || params.uuid;
  const seller_id = location.state?.sellerId;
  const product_id = location.state?.productId;
  const userId = useMemo(() => getId(), [getId])
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
      ws.current?.on(`received message in ${params.uuid}`, message => {
        console.log(message);
      })
    }
  }, [isReady, ws, params.uuid])

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
    if (message !== '') {
      console.log(params.uuid)
      ws.current?.emit(`send message in ${params.uuid}`, message);
      createMessage.mutate({
        uuid,
        message_from: userId,
        content: message,
        created_at: new Date().toLocaleString()
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          setMessage('');
        }
      })
    }
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