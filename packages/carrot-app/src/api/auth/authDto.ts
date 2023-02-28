export interface JwtToken {
  user_id: number;
  email: string;
  name: string;
  location: string;
  manner_temp: number;
  createdAt: string;
  updatedAt: string;
  exp: number;
}
