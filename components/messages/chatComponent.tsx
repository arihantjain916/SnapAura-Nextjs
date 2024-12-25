export const ChatComponent = ({conversation}: any) => {
  console.log(conversation);
  return (
    <>
      <div className="flex-1">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700">
          <div className="h-[42px] w-[42px] shrink-0 rounded-full">
            <img
              src={conversation.otherParty.profile}
              className="h-full w-full rounded-full object-cover"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-base text-slate-200">{conversation.otherParty.username}</h2>
            <p className="text-xs text-slate-400">Online 3 min ago</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 px-3 py-5">
            <div className="h-[45px] w-[45px] shrink-0 rounded-full">
              <img
                src="https://picsum.photos/750/710"
                className="h-full w-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="overflow-hidden text-left">
              <h2 className="truncate text-sm text-slate-200">
                Arder Oghlo <span className="text-xs text-slate-400">9:00</span>
              </h2>
              <div className="mt-2 flex flex-col gap-2">
                <div className="rounded-md bg-indigo-600 px-2 py-1.5">
                  <p className="truncate text-sm text-slate-100">
                    Let's meet today ?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3 px-3 py-5 text-right">
            <div className="h-[45px] w-[45px] shrink-0 rounded-full">
              <img
                src="https://picsum.photos/740/710"
                className="h-full w-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="truncate text-sm text-slate-200">
                James Rodrigo{" "}
                <span className="text-xs text-slate-400">9:01</span>
              </h2>
              <div className="mt-2 flex flex-col gap-2 justify-start">
                <div className="max-w-fit overflow-hidden rounded-md bg-light px-2 py-1.5">
                  <p className="truncate text-sm text-slate-300">
                    Ok in just a 5 min i will be there be ready in the time 😉
                  </p>
                </div>
                <div className="grid h-64 grid-cols-6 grid-rows-6 gap-3 rounded-md">
                  <img
                    src="https://picsum.photos/1040/1010"
                    alt=""
                    className="col-span-3 row-span-2 h-full w-full rounded-md object-cover"
                  />
                  <img
                    src="https://picsum.photos/1140/1010"
                    alt=""
                    className="col-span-3 row-span-4 h-full w-full rounded-md object-cover"
                  />
                  <img
                    src="https://picsum.photos/1640/1010"
                    alt=""
                    className="col-span-3 row-span-4 h-full w-full rounded-md object-cover"
                  />
                  <img
                    src="https://picsum.photos/1340/1010"
                    alt=""
                    className="col-span-3 row-span-4 h-full w-full rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <input type="text" className="w-full bg-slate-800 px-3 py-2 text-slate-200 placeholder:text-slate-400" placeholder="Type a message.." />
        </div>
      </div>
    </>
  );
};
