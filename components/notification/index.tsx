"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import AxiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
export const Notifications = () => {

  useEffect(() => {
    const pusher = new Pusher("fac20a8dfab0cadc489c", {
      cluster: "ap2",
      forceTLS: true,
      wsPort: 443,
      disableStats: true,
    });

    const channel = pusher.subscribe("notification");
    channel.bind("notification", (data: any) => {
      console.log(data);
    });
  }, []);

  async function fetchNotification() {
    try {
      const res = await AxiosInstance.get("/notification/fetch", {
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
    queryKey: ["notificationData"],
    queryFn: async () => await fetchNotification(),
    refetchInterval: 500000,
  });

  console.log(data);

  return (
    // {
    //     notification?.
    // }
    <h1>Notification</h1>
  );
};