"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const FetchConversation = () => {
  async function fetchConversation() {
    try {
      const res = await axios.get("/chat/conversation", {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });

      return res.data.data;
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
      {data?.map((convo: any) => (
        <div key={convo.id}>
          <p>Receiver: {convo.receiver_id}</p>
          <p>Sender: {convo.sender_id}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
