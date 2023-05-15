import {
  ApiResponse,
  GetNameApiResponse,
  RegisterApiRequest,
  SetNameApiRequest,
} from "./types.d.ts";

export async function register(
  userId: string,
  token: string,
): Promise<ApiResponse> {
  const body: RegisterApiRequest = { userId, token };
  const res = await fetch("/api/register", {
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

export async function getName(userId: string): Promise<GetNameApiResponse> {
  const url = new URL("/api/get_name", location.href);
  url.searchParams.set("user_id", userId);
  const res = await fetch(url);
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
