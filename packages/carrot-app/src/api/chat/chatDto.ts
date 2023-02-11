export interface CreateChatRoomDto {
  uuid: string
  seller_id: number
  buyer_id: number
  product_id: number
}

export interface GetChatRoomByIdDto {
  chatRoom_id: number
  uuid: string
  seller_id: number
  buyer_id: number
  product_id: number
}

export interface GetChatRoomByBuyerIdDto {
  chatRoom_id: number
  uuid: string
  seller_id: number
  product_id: number
}

export interface MessageDto {
  chatroom_id: string
  message_id: number
  message_from: number
  message_to: number
  content: string
  created_at: string
}