export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  result: {
    id: number;
    role: string;
    tile: string;
    firstname: string;
    lastname: string;
    username: string;
  };
  token: string;
  message: string;
}
