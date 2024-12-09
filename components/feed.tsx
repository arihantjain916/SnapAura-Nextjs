"use client";

import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import AxiosInstance from "@/lib/axiosInstance";

export const Feed = () => {
  async function fetchFeed() {
    try {
      const res = await AxiosInstance.get("/post");
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
  const { isPending, error, data } = useQuery({
    queryKey: ["feedData"],
    queryFn: async () => await fetchFeed(),
    refetchInterval: 50000,
  });

  console.log(data);

  return (
    <div className="container mx-auto my-10 sm:px-20">
      {data?.map((feed: any) => (
        <div key={feed.id} className="p-8 flex justify-center">
          <div className="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3">
            {/* Header Section */}
            <div className="w-full flex justify-between p-3">
              <div className="flex items-center">
                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src={feed.user.profile} alt={feed.user.username} />
                </div>
                <span className="pt-1 ml-2 font-bold text-sm">
                  {feed.user.username}
                </span>
              </div>
              <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
                <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
              </span>
            </div>

            {/* Image Section */}
            <img
              className="w-full bg-cover"
              src={feed.image}
              alt={feed.user.username}
            />

            {/* Content Section */}
            <div className="px-3 pb-2">
              {/* Likes */}
              <div className="pt-2 flex gap-2 items-center">
                <button>
                  <Heart />
                </button>
                <span className="text-base mb-2 cursor-pointer">12 likes</span>
              </div>

              {/* Description */}
              <div className="pt-1">
                <div className="mb-2 text-sm">
                  <span className="font-medium mr-2">{feed.user.username}</span>
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
  );
};
