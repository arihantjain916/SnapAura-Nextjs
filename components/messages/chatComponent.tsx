"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import EmojiPicker from "emoji-picker-react";
import { ChevronLeft, Send, SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RenderMessage } from "./renderMessage";
import { io } from "socket.io-client";
import axios from "axios";
import { MessageType } from "@/types/MessageType";

export const ChatComponent = ({
  conversation,
  setSelectedConversation,
}: any) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const socket = useRef(io("http://localhost:3001"));

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
    if (socket.current) {
      socket.current.on("msg-recieve", fetchMessages);
    }

    return () => {
      if (socket.current) {
        socket.current.off("msg-recieve");
      }
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [conversation]);

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
    setMessages((prev)=>[...prev,{...data, createdAt: new Date(Date.now()), id: Date.now().toString()}])
    setInputValue("");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={() => setSelectedConversation(null)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={conversation.convo.otherParty.profile}
            alt={conversation.convo.otherParty.username}
          />
          <AvatarFallback>
            {conversation.convo.otherParty.username
              .split(" ")
              .map((n: any) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h2 className="ml-4 text-xl font-semibold">
          {conversation.convo.otherParty.username}
        </h2>
      </div>

      {/* Chat Render */}
      <RenderMessage messages={messages} senderId={conversation?.senderId} />

      {/* Emoji Picker */}
      {emojiDisplay && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <EmojiPicker
            onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
          />
        </div>
      )}
      {/* Input section */}

      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center">
          {/* <div className="relative flex items-center w-full"> */}
          {/* <Button
          variant={"ghost"}
            onClick={() => setEmojiDisplay((prev) => !prev)}
            className="h-5 w-5 text-slate-400 dark:text-slate-500"
          >
            😂
          </Button> */}
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 mr-2 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          {/* </div> */}

          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
