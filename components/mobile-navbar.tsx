import { DATA } from "@/data/Sidebar";
import Link from "next/link";
export const MobileNavbar = () => {
  return (
    <div className="fixed z-50 w-[21rem] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 ">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        {DATA.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <item.icon/>
            <span className="sr-only">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
