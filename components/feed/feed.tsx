"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Eclipse, EclipseIcon, EllipsisIcon, Heart } from "lucide-react";
import AxiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SimpleImageSlider from "react-simple-image-slider";

export const Feed = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  async function fetchFeed() {
    try {
      const res = await AxiosInstance.get("/post", {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["feedData"],
    queryFn: async () => await fetchFeed(),
    refetchInterval: 500000,
  });

  if (error) {
    return (
      <div className="container mx-auto my-10 sm:px-20">
        <div className="p-8 flex justify-center">
          <div className="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3">
            <div className="px-3 pb-2">
              <h1 className="text-center text-2xl font-bold dark:text-white">
                Something went wrong
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="container mx-auto my-10 sm:px-20">
        <div className="p-8 flex justify-center">
          <div className="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3">
            <div className="px-3 pb-2">
              <h1 className="text-center text-2xl font-bold">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleLike(id: number) {
    try {
      const res = await AxiosInstance.post(
        `/post/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        }
      );

      if (res.data.success) {
        queryClient.invalidateQueries({ queryKey: ["feedData"] });
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto my-10 sm:px-20">
        {data?.map((feed: any) => (
          <div key={feed.id} className="p-8 flex justify-center">
            <div className="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 dark:bg-gray-800">
              {/* Header Section */}
              <div className="w-full flex justify-between p-3">
                <div className="flex items-center">
                  <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                    <img src={feed.user.profile} alt={feed.user.username} />
                  </div>
                  <span className="pt-1 ml-2 font-bold text-sm dark:text-white">
                    {feed.user.username}
                  </span>
                </div>
                <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
                  <EllipsisIcon/>
                </span>
              </div>
              {feed.image.length === 1 ? (
                <img src={feed.image} alt={feed.user.username} />
              ) : (
                <>
                  <SimpleImageSlider
                    width={481}
                    height={500}
                    images={feed.image}
                    showBullets={true}
                    showNavs={true}
                  />
                </>
              )}
              {/* Content Section */}
              <div className="px-3 pb-2">
                {/* Likes */}
                <div className="pt-2 flex gap-2 items-center">
                  <button
                    onClick={
                      isAuthenticated
                        ? () => handleLike(feed.id)
                        : () => undefined
                    }
                  >
                    <Heart className={feed.isLiked && "fill-red-500"} />
                  </button>
                  <span className="text-base mb-2 cursor-pointer">
                    {feed.totalLikes} likes
                  </span>
                </div>

                {/* Description */}
                <div className="pt-1">
                  <div className="mb-2 text-sm">
                    <span className="font-medium mr-2">
                      {feed.user.username}
                    </span>
                    {feed.caption}
                  </div>
                </div>

                {/* Comments */}
                {feed.comments.length > 0 && (
                  <>
                    <div className="text-base mb-2 cursor-pointer">
                      View all {feed.comments.length} comments
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium mr-2">
                        {feed.comments[0].user.username}
                      </span>
                      {feed.comments[0].comment}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
