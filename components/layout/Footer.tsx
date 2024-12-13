import { FooterData } from "@/data/FooterData";
import { SocialMediaData } from "@/data/FooterData";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <div className="flex-1 relative z-0 border-t border-gray-200">
        <footer className="bg-white dark:bg-black">
          <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
              <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Get updates in your inbox?
              </strong>

              <form className="mt-6">
                <div className="relative max-w-lg">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>

                  <input
                    className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium z-0 dark:bg-gray-700 dark:border-gray-600 text-white"
                    id="email"
                    type="email"
                    placeholder="john@doe.com"
                  />

                  <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
              <div className="mx-auto max-w-sm lg:max-w-none">
                <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg dark:text-white">
                  <span className="text-gray-900 font-bold dark:text-white underline">
                    SnapAura
                  </span>{" "}
                  is the social media platform that helps you connect with your
                  friends and family.
                </p>

                <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                  {SocialMediaData.map((icon) => (
                    <Link
                      className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-200 dark:hover:text-white"
                      href={icon.link}
                      target="_blank"
                      rel="noreferrer"
                      key={icon.id}
                    >
                      <span className="sr-only"> {icon.name} </span>
                      {icon.icon}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
                {FooterData.map((item) => (
                  <div key={item.id}>
                    <strong className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </strong>

                    <ul className="mt-6 space-y-1">
                      {item.links.map((link) => (
                        <li key={link.id}>
                          <Link
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-200 dark:hover:text-white"
                            href={link.link}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-8">
              <p className="text-center text-xs/relaxed text-gray-500 dark:text-gray-400">
                © SnapAura {
                  new Date().getFullYear()
                }. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
