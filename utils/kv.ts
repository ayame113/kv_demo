import { encode } from "https://deno.land/std@0.187.0/encoding/hex.ts";

export const kvPromise = Deno.openKv("./kv.sqlite");

export async function registerUser(userId: string) {
  if (typeof userId !== "string") {
    return false;
  }
  const kv = await kvPromise;
  const key = await sha256(userId);
  const res = await kv.get<string>(["users", key]);
  if (res.value !== null) {
    return false;
  }
  const transaction = await kv.atomic()
    .check(res)
    .set(["users", key], userId)
    .commit();
  return transaction.ok;
}

export async function hasUser(userId: string) {
  if (typeof userId !== "string") {
    return false;
  }
  const kv = await kvPromise;
  const key = await sha256(userId);
  const res = await kv.get<string>(["users", key]);
  return !!res.value;
}

export async function getUserName(userId: string) {
  if (typeof userId !== "string") {
    return null;
  }
  const kv = await kvPromise;
  const key = await sha256(userId);
  const res = await kv.get<string>(["users", key]);
  return res.value;
}

export async function setUserName(userId: string, name: string) {
  if (typeof userId !== "string" || typeof name !== "string") {
    return false;
  }
  const kv = await kvPromise;
  const key = await sha256(userId);
  const res = await kv.get<string>(["users", key]);
  if (res.value === null) {
    return false;
  }
  const transaction = await kv.atomic()
    .check(res)
    .set(["users", key], name)
    .commit();
  return transaction.ok;
}

export async function closeKv() {
  const kv = await kvPromise;
  await kv.close();
}

const decoder = new TextDecoder();
const encoder = new TextEncoder();
async function sha256(input: string) {
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return decoder.decode(encode(new Uint8Array(digest)));
}
