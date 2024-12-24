import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import AxiosInstance from "@/lib/axiosInstance";
import axios from "axios";

export const GoogleBtn = () => {
  async function handleGoogleSignIn() {
    try{
        const res = await axios.get("http://localhost:8000/api/oauth/google");
        console.log(res.data);
        if(res.data.status === 'success'){
            window.location.href = res.data.url;
        }
    }
    catch(err){
        console.log(err);
    }
  }
  return (
    <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
};
