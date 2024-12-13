import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormContent } from "./FormContent";

export const FeedCreate = () => {
  return (
    <div className="p-4">
      <Card className="">
        <CardHeader>Create New Post</CardHeader>
        <CardContent>
          <FormContent />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
