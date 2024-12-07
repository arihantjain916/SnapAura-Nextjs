import { HomeIcon, PencilIcon } from "lucide-react";
import { Icons } from "@/components/ui/icons";

export const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/arihantjain916",
        icon: Icons.gitHub,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/arihantjain916",
        icon: Icons.linkedin,
      },
      X: {
        name: "X",
        url: "https://twitter.com/arihantjain916",
        icon: Icons.x,
      },
      email: {
        name: "Send Email",
        url: "mailto:arihantj916@gmail.com",
        icon: Icons.email,
      },
    },
  },
};