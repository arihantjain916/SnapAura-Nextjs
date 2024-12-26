export const TabItem = ({
  icon,
  label,
  href,
  isActive,
}: {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}) => {
  return (
    <li
      className={`${
        isActive
          ? "md:border-t md:border-gray-700 dark:md:border-white md:text-gray-700 dark:md:text-white"
          : ""
      }`}
    >
      <a className="inline-block p-3" href={href}>
        <i className={icon}></i>
        <span className="hidden md:inline">{label}</span>
      </a>
    </li>
  );
};
