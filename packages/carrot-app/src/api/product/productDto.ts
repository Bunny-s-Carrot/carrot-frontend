import { UserType } from "../user/userDto";

export interface ProductType {
  product_id: number
  seller_id: number
  seller_location: number
  title: string
  price: number
  contents: string
  wanted_location: string
  price_suggest: number
  views: number
  share: number
  heart: number
  chat: number
  classif_id: number
  created_at: string
}

export interface ProductTypeWithLocation extends ProductType{
  ProductType: ProductType
  addr_name: string
}

export interface ProductDetailType {
  seller: UserType
  product: ProductType
}