import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export const FooterData = [
  {
    id: 1,
    title: "Services",
    links: [
      {
        id: 1,
        link: "#",
        text: "Marketing",
      },
      {
        id: 2,
        link: "#",
        text: "Graphic Design",
      },
      {
        id: 3,
        link: "#",
        text: "App Development",
      },
      {
        id: 4,
        link: "#",
        text: "Mobile Development",
      },
    ],
  },
  {
    id: 2,
    title: "About",
    links: [
      {
        id: 1,
        link: "#",
        text: "About Us",
      },
      {
        id: 2,
        link: "#",
        text: "Carrer",
      },
      {
        id: 3,
        link: "#",
        text: "History",
      },
      {
        id: 4,
        link: "#",
        text: "Our Team",
      },
    ],
  },
  {
    id: 3,
    title: "Support",
    links: [
      {
        id: 1,
        link: "#",
        text: "FAQ",
      },
      {
        id: 2,
        link: "#",
        text: "Contact",
      },
      {
        id: 3,
        link: "#",
        text: "Live Chat",
      },
    ],
  },
];

export const SocialMediaData = [
  {
    id: 1,
    link: "https://github.com/arihantjain916",
    icon: <GitHubLogoIcon />,
    name: "GitHub",
  },
  {
    id: 2,
    link: "https://www.linkedin.com/in/arihantjain916/",
    icon: <LinkedInLogoIcon />,
    name: "LinkedIn",
  },
  {
    id: 3,
    link: "https://www.instagram.com/arihantjain916/",
    icon: <InstagramLogoIcon />,
    name: "Instagram",
  },
  {
    id: 4,
    link: "https://x.com/arihantjain916",
    icon: <TwitterLogoIcon />,
    name: "Twitter",
  },
];
