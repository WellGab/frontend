import { io } from "socket.io-client";
import { env } from "../src/env.mjs";
import { useEffect } from "react";

const link = env.NEXT_PUBLIC_API_URL;

interface JRType {
  auth: {
    token: string;
  };
  room: string;
}

export function useSocket(token: string, room: string) {
  const socket = io(`${link}/api/v1/chats`, {
    transports: ["websocket", "polling"],
    auth: {
      token,
    },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with ID: ${socket.id}`);

      joinRoom({
        auth: {
          token,
        },
        room: room,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, token]);

  // Function to join a room
  function joinRoom(data: JRType) {
    socket.emit("join", data);
    console.log(`Joined room: ${data}`);
  }

  // Function to leave a room
  function sendMessage(message: string) {
    socket.emit("message", { message, room, auth: { token } });
    console.log(`sent to rooom: ${message} ${room}`);
  }

  socket.on("response", (data) => {
    console.log("Received response:", data);
  });

  socket.on("error", (data) => {
    console.log("Error response:", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  return {
    socket,
    sendMessage,
  };
}
