"use client";

import EmojiPicker from "emoji-picker-react";
import { ChangeEvent, SetStateAction, useState } from "react";

export const ChatComponent = ({ conversation }: any) => {
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  function sendMessage() {
    console.log(inputValue);
  }

  return (
    // <div className="flex-1">
    //   <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700">
    //     <div className="h-[42px] w-[42px] shrink-0 rounded-full">
    //       <img
    //         src={conversation.otherParty.profile}
    //         className="h-full w-full rounded-full object-cover"
    //         alt="Profile"
    //       />
    //     </div>
    //     <div>
    //       <h2 className="text-base text-slate-200">
    //         {conversation.otherParty.username}
    //       </h2>
    //       <p className="text-xs text-slate-400">Online 3 min ago</p>
    //     </div>
    //   </div>

    //   <div className="flex flex-col gap-2">
    //     <div className="flex gap-3 px-3 py-5">
    //       <div className="h-[45px] w-[45px] shrink-0 rounded-full">
    //         <img
    //           src="https://picsum.photos/750/710"
    //           className="h-full w-full rounded-full object-cover"
    //           alt="Avatar"
    //         />
    //       </div>
    //       <div className="overflow-hidden text-left">
    //         <h2 className="truncate text-sm text-slate-200">
    //           Arder Oghlo <span className="text-xs text-slate-400">9:00</span>
    //         </h2>
    //         <div className="mt-2 rounded-md bg-indigo-600 px-2 py-1.5">
    //           <p className="truncate text-sm text-slate-100">
    //             Let's meet today ?
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex flex-row-reverse gap-3 px-3 py-5 text-right">
    //       <div className="h-[45px] w-[45px] shrink-0 rounded-full">
    //         <img
    //           src="https://picsum.photos/740/710"
    //           className="h-full w-full rounded-full object-cover"
    //           alt="Avatar"
    //         />
    //       </div>
    //       <div className="overflow-hidden">
    //         <h2 className="truncate text-sm text-slate-200">
    //           James Rodrigo <span className="text-xs text-slate-400">9:01</span>
    //         </h2>
    //         <div className="mt-2">
    //           <div className="max-w-fit rounded-md bg-light px-2 py-1.5">
    //             <p className="truncate text-sm text-slate-300">
    //               Ok in just a 5 min I will be there, be ready 😉
    //             </p>
    //           </div>
    //           <div className="grid h-64 grid-cols-6 grid-rows-6 gap-3">
    //             {[1040, 1140, 1640, 1340].map((src, index) => (
    //               <img
    //                 key={index}
    //                 src={`https://picsum.photos/${src}/1010`}
    //                 alt="Media"
    //                 className="col-span-3 row-span-4 h-full w-full rounded-md object-cover"
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {emojiDisplay && (
    //       <EmojiPicker
    //         onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
    //       />
    //     )}
    //     <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg shadow-md py-4 mx-2 bottom-0">
    //       <button
    //         onClick={() => setEmojiDisplay((prev) => !prev)}
    //         className="flex items-center justify-center w-10 h-10 text-lg bg-slate-700 text-white rounded-full hover:bg-slate-600 focus:outline-none"
    //         aria-label="Toggle Emoji Picker"
    //       >
    //         😂
    //       </button>

    //       <input
    //         type="text"
    //         value={inputValue}
    //         onChange={handleInputChange}
    //         placeholder="Type a message..."
    //         className="flex-1 px-4 py-2 bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-slate-700 rounded-lg focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50"
    //       />

    //       <button
    //         onClick={sendMessage}
    //         className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700">
        <div className="h-[42px] w-[42px] shrink-0 rounded-full">
          <img
            src={conversation.otherParty.profile}
            className="h-full w-full rounded-full object-cover"
            alt="Profile"
          />
        </div>
        <div>
          <h2 className="text-base text-slate-200">
            {conversation.otherParty.username}
          </h2>
          <p className="text-xs text-slate-400">Online 3 min ago</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-4">
        <div className="flex gap-3">
          <div className="h-[45px] w-[45px] shrink-0 rounded-full">
            <img
              src="https://picsum.photos/750/710"
              className="h-full w-full rounded-full object-cover"
              alt="Avatar"
            />
          </div>
          <div className="overflow-hidden text-left">
            <h2 className="truncate text-sm text-slate-200">
              Arder Oghlo <span className="text-xs text-slate-400">9:00</span>
            </h2>
            <div className="mt-2 rounded-md bg-indigo-600 px-2 py-1.5">
              <p className="truncate text-sm text-slate-100">
                Let's meet today?
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3">
          <div className="h-[45px] w-[45px] shrink-0 rounded-full">
            <img
              src="https://picsum.photos/740/710"
              className="h-full w-full rounded-full object-cover"
              alt="Avatar"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="truncate text-sm text-slate-200">
              James Rodrigo <span className="text-xs text-slate-400">9:01</span>
            </h2>
            <div className="mt-2">
              <div className="max-w-fit rounded-md bg-light px-2 py-1.5">
                <p className="truncate text-sm text-slate-300">
                  Ok in just a 5 min I will be there, be ready 😉
                </p>
              </div>
              <div className="grid h-64 grid-cols-6 grid-rows-6 gap-3">
                {[1040, 1140, 1640, 1340].map((src, index) => (
                  <img
                    key={index}
                    src={`https://picsum.photos/${src}/1010`}
                    alt="Media"
                    className="col-span-3 row-span-4 h-full w-full rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {emojiDisplay && (
        <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)} />
      )}

      <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg shadow-md py-4 mt-auto">
        <button
          onClick={() => setEmojiDisplay((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 text-lg bg-slate-700 text-white rounded-full hover:bg-slate-600 focus:outline-none"
        >
          😂
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-slate-700 rounded-lg focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50"
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};
