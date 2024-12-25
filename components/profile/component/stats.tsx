export const Stats = ({
  stats,
  className,
}: {
  stats: {
    posts: number;
    followers: string;
    following: number;
  };
  className?: string;
}) => {
  return (
    <ul className={`flex ${className}`}>
      <li>
        <span className="font-semibold">{stats.posts}</span> posts
      </li>
      <li>
        <span className="font-semibold">{stats.followers}</span> followers
      </li>
      <li>
        <span className="font-semibold">{stats.following}</span> following
      </li>
    </ul>
  );
};
