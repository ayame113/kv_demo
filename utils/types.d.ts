export interface ApiResponse {
  success: boolean;
}

export interface GetNameApiResponse extends ApiResponse {
  name: string|null;
}

export interface RegisterApiRequest {
  userId: string;
  token: string;
}

export interface SetNameApiRequest {
  userId: string;
  name: string;
}
