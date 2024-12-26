import "./post.css";
import Link from "next/link";
import { Heart } from "lucide-react";
export const Posts = ({ post }: any) => {
  if (post?.length === 0) {
    return (
      <>
        <h1>No Posts Found</h1>
      </>
    );
  }
  return (
    <div className="flex flex-wrap -mx-px md:-mx-3">
      {post?.map((post: any) => (
        <div className="w-1/3 p-px md:px-3" key={post.id}>
          <Link href="#">
            <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
              <img
                className="w-full h-full absolute left-0 top-0 object-cover"
                src={post?.images[0]?.image}
                alt="image"
              />

              <i className="fas fa-square absolute right-0 top-0 m-1"></i>
              <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                <div className="flex justify-center items-center h-full">
                  <span className="">
                    <Heart />
                    {post?.likes?.length}
                  </span>

                  <span className="p-2">
                    {/* <Comment */}
                    {post?.comments?.length}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </div>
  );
};
