"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import AxiosInstance from "@/lib/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
import { NotificationTypes } from "@/types/NotificationType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NotificationRender } from "./render";

export const Notifications = () => {
  const { id } = useSelector((state: RootState) => state.auth);

  const [notification, setNotification] = useState<NotificationTypes[] | []>(
    []
  );
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

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("fac20a8dfab0cadc489c", {
      cluster: "ap2",
      forceTLS: false,
    });

    const channel = pusher.subscribe(`notification.${id}`);
    channel.bind("notification", (data: any) => {
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
      <NotificationRender notification={notification} />
    </>
  );
};
