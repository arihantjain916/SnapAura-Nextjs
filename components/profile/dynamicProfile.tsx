"use client";

import AxiosInstance from "@/lib/axiosInstance";
import { RootState } from "@/redux/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Stats } from "./component/stats";
import { TabItem } from "./component/tabs";
import { Posts } from "./component/posts";
import Cookies from "js-cookie";
import { useState } from "react";

export const DynamicProfile = () => {
  const router = useRouter();
  const { username, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const params = useParams<{ username: string }>();

  const [notificationId, setNotificationId] = useState<string>("");

  async function fetchProfile() {
    try {
      const res = await AxiosInstance.get(
        `/search/profile/${params.username}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: async () => await fetchProfile(),
    refetchOnWindowFocus: false,
  });

  const user = {
    bio: "Travel, Nature and Music",
    description: "Lorem ipsum dolor sit amet consectetur",
    stats: {
      posts: data?.posts?.length ?? 0,
      followers: data?.followers?.length ?? 0,
      following: data?.following?.length ?? 0,
    },
  };

  function handleEdit() {
    router.push("/profile");
  }

  async function handleFollow(type: string, id: string) {
    if (type === "follow") {
      if (!isAuthenticated) {
        alert("Please login to follow someone");
      } else {
        const res = await AxiosInstance.get(`/follow/request/send/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        });
        if (res.data.status) {
          alert(res.data.message);
          console.log(res.data)
          setNotificationId(res.data.id)
          queryClient.invalidateQueries({ queryKey: ["fetchProfile"] });
        }
      }
    } else {
      const res = await AxiosInstance.get(`/follow/request/unfollow/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });
      if (res.data.status) {
        alert(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["fetchProfile"] });
      }
    }
  }

  function getButton() {
    if (data?.username == username) {
      return <Button onClick={handleEdit}>Edit</Button>;
    }

    const className =
      "bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block";

    // if (data?.isFollowing) {
    //   return (
    //     <Button
    //       className={className}
    //       onClick={() => handleFollow("follow", data?.id)}
    //     >
    //       Follow
    //     </Button>
    //   );
    // }

    switch (data?.followStatus) {
      case "pending":
        return (
          <Button
            className={className}
            onClick={() => handleFollow("unfollow", data?.id)}
          >
            Request Sent
          </Button>
        );
      case "rejected":
        return (
          <Button
            className={className}
            onClick={() => handleFollow("follow", data?.id)}
          >
            Follow
          </Button>
        );
      case "accepted":
        return (
          <Button
            className={className}
            onClick={() => handleFollow("ufollow", data?.id)}
          >
            Unfollow
          </Button>
        );
      default:
        return (
          <Button
            className={className}
            onClick={() => handleFollow("follow", data?.id)}
          >
            Follow
          </Button>
        );
    }
  }

  return (
    <main className="bg-white dark:bg-black">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <header className="flex flex-wrap items-center p-4 md:py-8">
          <div className="md:w-3/12 md:ml-16">
            <img
              className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src={data?.profile}
              alt="profile"
            />
          </div>

          <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {data?.username}
              </h2>
              <span
                className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                aria-hidden="true"
              >
                <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              {getButton()}
            </div>

            <Stats
              stats={user.stats}
              className="hidden md:flex space-x-8 mb-4"
            />

            <div className="hidden md:block">
              {data?.name && <h1 className="font-semibold">{data?.name}</h1>}
              <span>{user.bio}</span>
              <p>{user.description}</p>
            </div>
          </div>

          <div className="md:hidden text-sm my-2">
            {data?.name && <h1 className="font-semibold">{data?.name}</h1>}
            <span>{user.bio}</span>
            <p>{user.description}</p>
          </div>
        </header>

        <div className="px-px md:px-3">
          <Stats
            stats={user.stats}
            className="md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm"
          />

          <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 dark:text-gray-400 border-t">
            <TabItem
              icon="fas fa-th-large text-xl md:text-xs"
              label="post"
              href="#"
              isActive={true}
            />
            <TabItem
              icon="far fa-square text-xl md:text-xs"
              label="igtv"
              href="#"
            />
            <TabItem
              icon="fas fa-user border border-gray-500 px-1 pt-1 rounded text-xl md:text-xs"
              label="tagged"
              href="#"
            />
          </ul>

          <Posts post={data?.posts} />
        </div>
      </div>
    </main>
  );
};
