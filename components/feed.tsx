import { Heart } from "lucide-react";

export const Feed = () => {
  return (
    <div className="p-8">
      <div className="container mx-auto my-10 sm:px-20  flex justify-center">
        <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="w-full flex justify-between p-3">
            <div className="flex">
              <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                <img
                  src="https://avatars0.githubusercontent.com/u/38799309?v=4"
                  alt="profilepic"
                />
              </div>
              <span className="pt-1 ml-2 font-bold text-sm">braydoncoyer</span>
            </div>
            <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
              <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
            </span>
          </div>
          <img
            className="w-full bg-cover"
            src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG"
          />
          <div className="px-3 pb-2">
            <div className="pt-2 flex gap-2 items-center">
              <button>
                <Heart />
              </button>
              <span className="text-base mb-2 cursor-pointer">12 likes</span>
            </div>
            <div className="pt-1">
              <div className="mb-2 text-sm">
                <span className="font-medium mr-2">braydoncoyer</span> Lord of
                the Rings is my favorite film-series. One day I'll make my way
                to New Zealand to visit the Hobbiton set!
              </div>
            </div>
            <div className="text-base mb-2 cursor-pointer">
              View all 14 comments
            </div>
            <div className="mb-2">
              <div className="mb-2 text-sm">
                <span className="font-medium mr-2">razzle_dazzle</span> Dude!
                How cool! I went to New Zealand last summer and had a blast
                taking the tour! So much to see! Make sure you bring a good
                camera when you go!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
