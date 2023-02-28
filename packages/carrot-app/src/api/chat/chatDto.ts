export interface CreateChatRoomDto {
  uuid: string;
  seller_id: number;
  buyer_id: number;
  product_id: number;
}

export interface GetChatRoomByIdDto {
  chatRoom_id: number;
  uuid: string;
  seller_id: number;
  buyer_id: number;
  product_id: number;
}

export interface GetChatRoomByUserIdDto {
  chatRoom_id: number;
  uuid: string;
  seller_id: number;
  product_id: number;
  displayName: string;
  displayLoc: string;
  recentMessage: string;
  recentTime: string;
}

export interface MessageDto {
  uuid?: string;
  message_from: number;
  content: string;
  created_at: string;
}
