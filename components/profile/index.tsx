import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FormContent } from "./FormContent";

export function Profile() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Profile Info</CardTitle>
          <CardDescription>
            You can update your profile information here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormContent />
        </CardContent>
      </Card>
    </div>
  );
}
