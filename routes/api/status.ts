import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { hasUser } from "../../utils/kv.ts";
import { StatusApiResponse } from "../../utils/types.d.ts";

export const handler: Handlers = {
  async GET(req) {
    const userId = req.headers.get("User-Id");

    if (typeof userId !== "string") {
      return createCommonResponse(Status.Forbidden);
    }

    if (!await hasUser(userId)) {
      return createCommonResponse(Status.Forbidden);
    }

    // TODO: ステータス取得処理
    const res: StatusApiResponse = {
      success: true,
      // @ts-ignore: __LOCKED__
      locked: globalThis.__LOCKED__ ?? null,
    };
    return Response.json(res);
  },
};
