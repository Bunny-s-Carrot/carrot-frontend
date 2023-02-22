import { api } from "../../infra/api";
import { CreateChatRoomDto, GetChatRoomByIdDto, GetChatRoomByUserIdDto, MessageDto } from "./chatDto";

const createChatRoom = async ({uuid, seller_id, buyer_id, product_id}: CreateChatRoomDto) => {
  const response = await api.post('chat/chatroom',
  {
    uuid,
    seller_id,
    buyer_id,
    product_id,
  });

  return response;
}

const getChatRoomByUuid = async (uuid: string) => {
  try {
    const { data } = await api.get<{ payload: { uuid: string } }>(`chat/chatroom/uuid/${uuid}`);

    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
}

const getChatRoomById = async (chatRoomIds: string) => {
  try {
    const { data } = await api.get<{ payload: GetChatRoomByIdDto }>('chat/chatroom',
    {
      params: { chatRoom_id: chatRoomIds }
    })

    return data.payload
  } catch (e: any) {
    throw Error(e);
  } 
}

const getChatRoomByUserId = async (user_id: number, product_id='') => {
  try {
    const { data } = await api.get<{ payload: GetChatRoomByUserIdDto[] }>(`chat/chatroom/${user_id}`,
    {
      params: { product_id }
    })

    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
}

// const getMessages = async (uuid: string) => {
//   try {
//     const { data } = await api.get<{ payload: MessageDto[] }>(`/chat/chatroom/${uuid}/message`);
//     console.log('성공' + data)
//     return data.payload;
//   } catch (e: any) {
//     throw Error(e);
//   }
// }


const getMessages = async (uuid: string) => {
  try {
    const { data } = await api.get<{ payload: MessageDto[] }>(
      `chat/chatroom/${uuid}/message`);
    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
  
}

const createMessage = async ({
  uuid,
  message_from,
  content,
  created_at
}: MessageDto) => {
  try {
    const result = await api.post('/chat/chatroom/1',
    {
      uuid,
      message_from,
      content,
      created_at
    })

    return result;
  } catch (e: any) {
    throw Error(e);
  }
}

const chatApi = {
  createChatRoom,
  getChatRoomById,
  getChatRoomByUserId,
  getChatRoomByUuid,
  getMessages,
  createMessage
}

export default chatApi;