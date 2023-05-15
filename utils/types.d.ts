export interface ApiResponse {
  success: boolean;
}

export interface RegisterApiResponse extends ApiResponse {
  userId: string | null;
}

export interface GetNameApiResponse extends ApiResponse {
  name: string | null;
}

export interface RegisterApiRequest {
  token: string;
}

export interface DeleteApiRequest {
  token: string;
  userId: string;
}

export interface SetNameApiRequest {
  userId: string;
  name: string;
}
