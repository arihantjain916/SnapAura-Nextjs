"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import EmojiPicker from "emoji-picker-react";
import { ChevronLeft, Send, SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export const ChatComponent = ({
  conversation,
  setSelectedConversation,
}: any) => {
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    console.log(inputValue);
    setInputValue("");
    // Add logic for sending a message (e.g., an API call)
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
      {/* <div className="flex-1 overflow-y-auto px-3 py-5 space-y-4">
        {conversation.messages.map((message: any) => {
          const isSender = message.senderId === user.id;
          return renderMessage(message, isSender);
        })}
      </div> */}

      {emojiDisplay && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <EmojiPicker
            onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
          />
        </div>
      )}

      <div className="flex items-center gap-3 p-3 bg-slate-200 dark:bg-slate-900 rounded-lg shadow-md py-4 mt-auto sm:mb-[3.3rem] sm:py-4 sm:p-4 mb-[7.3rem]">
        {/* <button
          onClick={() => setEmojiDisplay((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 text-lg bg-slate-200 dark:bg-slate-700 text-white rounded-full hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50"
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
          className="flex-1 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-slate-100 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-700 dark:border-slate-600 rounded-lg focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50 sm:px-3 sm:py-3 sm:text-base"
        /> */}
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
        <button
          onClick={sendMessage}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
