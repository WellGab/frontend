import io from "socket.io-client";
import { env } from "../src/env.mjs";

const link = env.NEXT_PUBLIC_API_URL;

const socket = io(link + "/api/v1/chats", {
  transports: ["websocket", "polling"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU2MGZiMmJiMGU0OGFiNmRjY2QwMmZlIiwiZXhwIjoxNzAwOTM3MDc3fQ.EStnSSuweLmWwwTmK1g8zmm6GdzyYaf4K2Hqd2NZQus",
  },
});

export default socket;
