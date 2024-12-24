import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export const GoogleBtn = () => {
  async function handleGoogleSignIn() {}
  return (
    <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
};
