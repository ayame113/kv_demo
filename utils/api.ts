import {
  ApiResponse,
  DeleteApiRequest,
  GetNameApiResponse,
  RegisterApiRequest,
  RegisterApiResponse,
  SetNameApiRequest,
  StatusApiResponse,
} from "./types.d.ts";

export async function register(token: string): Promise<RegisterApiResponse> {
  const body: RegisterApiRequest = { token };
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return { success: false, userId: null };
  }
  return await res.json();
}

export async function deleteUser(
  userId: string,
  token: string,
): Promise<ApiResponse> {
  const body: DeleteApiRequest = { userId, token };
  const res = await fetch("/api/delete", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return { success: false };
  }
  return await res.json();
}

export async function open(userId: string): Promise<ApiResponse> {
  const res = await fetch("/api/open", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    return { success: false };
  }
  return await res.json();
}

export async function close(userId: string): Promise<ApiResponse> {
  const res = await fetch("/api/close", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    return { success: false };
  }
  return await res.json();
}

export async function status(userId: string): Promise<StatusApiResponse> {
  const res = await fetch("/api/status", { headers: { "User-Id": userId } });
  if (!res.ok) {
    return { success: false, locked: null };
  }
  return await res.json();
}

export async function getName(userId: string): Promise<GetNameApiResponse> {
  const res = await fetch("/api/get_name", { headers: { "User-Id": userId } });
  if (!res.ok) {
    return { success: false, name: "" };
  }
  return await res.json();
}

export async function setName(
  userId: string,
  name: string,
): Promise<ApiResponse> {
  const body: SetNameApiRequest = { userId, name };
  const res = await fetch("/api/set_name", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return { success: false };
  }
  return await res.json();
}
