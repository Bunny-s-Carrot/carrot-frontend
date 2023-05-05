import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import useWebSocket from '../../../hooks/useWebSocket';
import chatApi from '../../../api/chat';
import useJwtDecode from '../../../hooks/auth/useJwtDecode';
import { MessageDto } from '../../../api/chat/chatDto';

const useChatRoomDetailViewModel = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<MessageDto[]>([]);
  const [receivedMessage, setReceivedMessage] = useState({});
  const [isJoined, setIsJoined] = useState(false);
  const [isOpenMore, openMore] = useState(false);
  const [isScrollSmooth, setScrollSmooth] = useState(false);
  const [exist, setExist] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { ws, isReady } = useWebSocket(process.env.REACT_APP_API_URL as string);
  const { getId } = useJwtDecode();
  const uuid = location.state?.uuid || params.uuid;
  const seller_id = location.state?.sellerId;
  const product_id = location.state?.productId;
  const userId = useMemo(() => getId(), [getId]);
  const createChatRoom = useMutation(chatApi.createChatRoom);
  const createMessage = useMutation(chatApi.createMessage);

  const { data: chatRoomData, isSuccess: getChatRoomSuccess } = useQuery(
    [`chat/chatroom/${uuid}`],
    () => chatApi.getChatRoomByUuid(uuid),
  );

  const {
    data: messages,
    isSuccess: getMessagesSuccess,
    refetch,
  } = useQuery(
    [`chat/chatroom/${uuid}/message`],
    () => chatApi.getMessages(uuid),
    {
      onSuccess: () => {
        messages && setChats(messages);
      },
      refetchInterval: 0,
    },
  );

  const handleClickMoreButton = () => {
    openMore(!isOpenMore);
  };

  const scrollBottom = () => {
    if (!isScrollSmooth) {
      scrollRef.current?.scrollIntoView();
      setScrollSmooth(true);
      return;
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!exist) {
      createChatRoom.mutate({
        uuid,
        seller_id,
        buyer_id: userId,
        product_id,
      });
      setExist(true)
    }
    if (message !== '') {
      const createdAt = new Date().toLocaleString();

      ws.current?.emit('send-message', { message, userId, uuid, createdAt });
      setChats((prev: MessageDto[]) => [
        ...prev,
        { message_from: userId, content: message, created_at: createdAt },
      ]);
      createMessage.mutate(
        {
          uuid,
          message_from: userId,
          content: message,
          created_at: createdAt,
        },
        {
          onSuccess: () => {
            setMessage('');
            refetch();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isReady) {
      ws.current?.emit('join-room', params.uuid);
      setIsJoined(true);
    }
  }, [isReady, ws, params.uuid]);

  useEffect(() => {
    if (isJoined) {
      ws.current?.on(`receive-message`, ({ message, userId, createdAt }) => {
        setReceivedMessage({ message, createdAt });
        setChats((prev: MessageDto[]) => [
          ...prev,
          { message_from: userId, content: message, created_at: createdAt },
        ]);
      });
    }
  }, [isJoined, ws]);

  useEffect(() => {
    refetch();
  }, [receivedMessage, refetch]);

  useEffect(() => {
    if (getChatRoomSuccess) {
      chatRoomData && setExist(true);
    }
  }, [getChatRoomSuccess, setExist, chatRoomData]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0rem';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight / 10 + 'rem';
    }
  }, [textAreaRef, message]);

  return {
    textAreaRef,
    scrollRef,
    message,
    setMessage,
    chats,
    isOpenMore,
    messages,
    getMessagesSuccess,
    userId,
    handleClickMoreButton,
    sendMessage,
    scrollBottom,
  };
};

export default useChatRoomDetailViewModel;
