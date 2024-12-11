"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth";
import { useRouter } from "next/navigation";

import { FormContent } from "./FormContent";

export function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px] mr-4 md:w-[500px] md:mr-0">
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

      <button
        className="absolute top-4 right-4 md:top-8 md:right-8 rounded-md bg-red-500 px-4 py-2 text-white"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
