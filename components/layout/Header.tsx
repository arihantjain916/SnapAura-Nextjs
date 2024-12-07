"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth";
import { useSelector, useDispatch } from "react-redux";
// import { defaultBlog } from "@/redux/features/blog";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Icons } from "../ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Create a separate LoginButton component
const LoginButton = () => {
  return (
    <Link
      className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 lg:block"
      href="/auth/login"
    >
      Login
    </Link>
  );
};

// Create a separate RegisterButton component
const RegisterButton = () => {
  return (
    <Link
      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 lg:block"
      href="/auth/register"
    >
      Register
    </Link>
  );
};

// Navbar component
export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, username } = useSelector(
    (state: RootState) => state.auth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenufunction = () => {
    setIsMenuOpen(true);
  };

  const closeMenufunction = () => {
    setIsMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    // dispatch(defaultBlog());
    router.push("/");
  };

  return (
    <div className="bg-gray-100 px-4 py-5 w-full">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <h2 className="text-3xl font-bold ml-10">EduNex</h2>
          </Link>
        </div>
        <div className="hidden lg:block">
          <Navbar className="bg-gray-100">
            <NavbarContent
              className="sm:flex gap-4 bg-gray-100"
              justify="center"
            >
              <NavbarItem>
                <Link color="foreground" href="/blog" className=" text-lg">
                  Blog
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href="/contact-us"
                  color="foreground"
                  className=" text-lg"
                >
                  Contact-us
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/team" className=" text-lg">
                  Team
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        {isAuthenticated ? (
          <div className="px-5 py-2.5 mr-10 lg:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <p className="font-bold">Signed as</p>
                <p>{username}</p>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      router.push(`/dashboard/${username}`);
                    }}
                  >
                    Profile
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="sm:flex sm:gap-4 mr-8 hidden md:hidden lg:flex lg:gap-4">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={openMenufunction}
          >
            <Icons.openMenu />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center mr-8"
                    >
                      <h2 className="text-2xl">EduNex</h2>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={closeMenufunction}
                    >
                      <Icons.closeMenu />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/blog"
                        aria-label="Your Learning"
                        title="Your Learning"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        aria-label="Features"
                        title="Features"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Contact-Us
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/team"
                        aria-label="About Us"
                        title="About Us"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Team
                      </Link>
                    </li>
                    {isAuthenticated ? (
                      <li>
                        <Link
                          aria-label="Sign in"
                          title="Sign in"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          <button
                            onClick={() => {
                              onLogout();
                            }}
                          >
                            Logout
                          </button>
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="/auth/login"
                            aria-label="Sign in"
                            title="Sign in"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Sign in
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/auth/register"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
