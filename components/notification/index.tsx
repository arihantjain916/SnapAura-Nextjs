"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import AxiosInstance from "@/lib/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
import { NotificationTypes } from "@/types/NotificationType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const Notifications = () => {
  const { username } = useSelector((state: RootState) => state.auth);

  const [notification, setNotification] = useState<NotificationTypes[]>([]);
  async function fetchNotification() {
    try {
      const res = await AxiosInstance.get("/notification/fetch", {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });
      setNotification(res.data.data);
    } catch (err) {
      throw err;
    }
  }

  //   const { isPending, error, data } = useQuery({
  //     queryKey: ["notificationData"],
  //     queryFn: async () => await fetchNotification(),
  //     refetchInterval: 500000,
  //   });

  //   if (isPending) return <h1>Loading...</h1>;
  //   if (error) {
  //     console.log(error);
  //     return <h1>Something went wrong</h1>;
  //   }

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("fac20a8dfab0cadc489c", {
      cluster: "ap2",
      forceTLS: false,
      // wsPort:80
    });

    const channel = pusher.subscribe(`notification.${username}`);
    channel.bind("notification.follow", (data: any) => {
      console.log(data);
      setNotification((prev: any) => [...prev, data.data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Notification</h1>

      {notification?.map((data: any) => (
        <div key={data.id}>
          <p>{data.id}</p>
          <h1>{data.message}</h1>
        </div>
      ))}
    </>
  );
};
