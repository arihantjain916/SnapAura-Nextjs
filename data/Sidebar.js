import {
  Bell,
  Home,
  Search,
  MessageCircle,
  User,
  CirclePlus,
} from "lucide-react";


export const DATA = (username) => [
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
    url: "/messages",
    icon: MessageCircle,
  },
  {
    name: "Profile",
    url: `/${username}`,
    icon: User,
  },
];
