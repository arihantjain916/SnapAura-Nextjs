import {
  Bell,
  Home,
  Search,
  MessageCircle,
  User,
  CirclePlus,
} from "lucide-react";

export const DATA = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Search",
    url: "/search",
    icon: Search,
  },
  {
    name: "Notification",
    url: "/notification",
    icon: Bell,
  },
  {
    name: "Create",
    url: "/feed/create",
    icon: CirclePlus,
  },
  {
    name: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: User,
  },
];
