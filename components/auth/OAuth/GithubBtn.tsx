import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export const GitHubBtn = () => {
  async function handleGitHubLogin() {}
  return (
    <Button variant="outline" type="button" onClick={handleGitHubLogin}>
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
};
