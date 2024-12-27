"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import EmojiPicker from "emoji-picker-react";
import { ChevronLeft, Send, SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RenderMessage } from "./renderMessage";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import axios from "axios";

export const ChatComponent = ({
  conversation,
  setSelectedConversation,
}: any) => {
  const [messages, setMessages] = useState();
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const socket = useRef(io("localhost:3001"));

  socket.current.on("connect", () => {
    socket.current.emit("add-user", Cookies.get("AUTH_TOKEN"));
  });

  async function fetchMessages() {
    try {
      const res = await axios.get(`/chat/messages/${conversation.convo.id}`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setMessages(msg);
      });
    }
  }, []);

  const handleEmojiClick = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    const data = {
      senderId: conversation?.senderId,
      receiverId: conversation.convo.otherParty.id,
      message: inputValue,
    };

    socket.current.emit("send-msg", data);
    setInputValue("");
  };

  return (
    <div className="flex-1 flex flex-col h-screen max-h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700 sm:px-4 sm:py-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setSelectedConversation(null)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Avatar className="h-12 w-12">
            <AvatarImage
              className="w-full h-full rounded-full object-cover"
              src={conversation.convo.otherParty.profile}
              alt={conversation.convo.otherParty.username}
            />
            <AvatarFallback>
              {conversation.convo.otherParty.username
                .split(" ")
                .map((n: any[]) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-base text-black text-sm sm:text-base dark:text-white">
            {conversation.convo.otherParty.username}
          </h2>
          <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
            Online 3 min ago
          </p>
        </div>
      </div>

      {/* Chat messages section */}
      <RenderMessage messages={messages} senderId={conversation?.senderId} />

      {emojiDisplay && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <EmojiPicker
            onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
          />
        </div>
      )}

      <div className="flex items-center gap-3 p-3 bg-slate-200 dark:bg-slate-900 rounded-lg shadow-md py-4 mt-auto sm:mb-[3.3rem] sm:py-4 sm:p-4 mb-[7.3rem]">
        <div className="relative flex items-center w-full">
          <button
            onClick={() => setEmojiDisplay((prev) => !prev)}
            className="absolute ml-2 h-5 w-5 text-slate-400 dark:text-slate-500"
          >
            😂
          </button>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="w-full rounded-md border-none bg-slate-100 dark:bg-slate-800 py-2 pl-9 pr-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
        </div>
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
