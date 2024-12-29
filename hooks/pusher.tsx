"use client";

import Pusher from "pusher-js";
import { useState, useEffect } from "react";

export const usePusher = ({ type, id }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("fac20a8dfab0cadc489c", {
      cluster: "ap2",
      forceTLS: false,
      // wsPort:80
    });

    const channel = pusher.subscribe(`notification.${id}`);
    channel.bind(`${type}.follow`, (data: any) => {
     setData(data)
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [type]);

  return { data, setData };
};
