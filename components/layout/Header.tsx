"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Home, Search, Users, Menu, X } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMobileMenuOpen]);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 flex justify-end">
      <div className="container flex h-16">
        <Link href="/" className="flex items-center space-x-2">
          <Users className=" hidden h-6 w-6 sm:inline-block" />
          <span className="font-bold">SnapAura</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </nav>
          <div className="hidden w-full max-w-sm sm:flex">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isMobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex flex-col h-full py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg ml-2">SnapAura</span>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <Input type="search" placeholder="Search..." className="mb-4" />
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                onClick={toggleMobileMenu}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/search"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                onClick={toggleMobileMenu}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
              <Button
                variant="ghost"
                className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent"
                onClick={toggleMobileMenu}
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
