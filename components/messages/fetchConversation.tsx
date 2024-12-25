"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const FetchConversation = () => {
  async function fetchConversation() {
    try {
      const res = await axios.get("/chat/conversation", {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["conversationData"],
    queryFn: async () => await fetchConversation(),
    refetchInterval: 500000,
  });

  if (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error?.response?.data.message;
    }
    console.log(message);
    return <p>Something went wrong</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex min-h-screen w-full bg-primary-bg">
        <div className="w-[270px] border-r border-r-slate-700 px-4 py-4">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute ml-2 h-5 w-5 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border-none bg-[#343143] py-2 pl-9 pr-3 text-slate-200 focus:outline-none"
            />
          </div>

          <div className="mt-5 flex items-center">
            <div className="flex items-center gap-2 text-slate-200">
              <p className="font-medium">Messages</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-auto h-5 w-5 text-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {data?.data?.map((convo: any) => {
              const isAuthUserSender = convo.senderId === data.authUserId;
              const nameToDisplay = isAuthUserSender
                ? convo.otherParty.username
                : convo.senderName.username;

              return (
                <div key={convo.id}>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors duration-300 hover:bg-light">
                    <div className="h-[42px] w-[42px] shrink-0 rounded-full">
                      <img
                        src={
                          isAuthUserSender
                            ? convo.otherParty.profile
                            : convo.senderName.profile
                        }
                        className="h-full w-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <h2 className="truncate text-sm font-medium text-slate-200">
                        {nameToDisplay}
                      </h2>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
