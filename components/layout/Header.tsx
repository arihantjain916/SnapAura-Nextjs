import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Home, Search, Users, Menu } from "lucide-react";
import { UserDropdown } from "./UserDropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 flex justify-end">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            SocialConnect
          </span>
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
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
