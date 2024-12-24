import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import axios from "axios";

export const GitHubBtn = () => {
  async function handleGitHubLogin() {
    try {
      const res = await axios.get("http://localhost:8000/api/oauth/github");
      console.log(res.data);
      if (res.data.status === "success") {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Button variant="outline" type="button" onClick={handleGitHubLogin}>
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
};
