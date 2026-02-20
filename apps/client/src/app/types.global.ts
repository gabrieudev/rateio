export {};

declare global {
  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface SignupRequest {
    name: string;
    email: string;
    password: string;
  }

  export interface User {
    id?: string;
    name: string;
    email: string;
    imageUrl?: string;
  }

  export interface AuthResponse {
    accessToken: string;
    tokenType: string;
  }

  export interface ApiError {
    message: string;
    status?: number;
  }
}
