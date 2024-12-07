import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./FormContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoginComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[400px] ">
          <CardHeader>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
          <CardFooter>
            <p className="px-10 text-center text-sm text-muted-foreground">
              Already have an account?
              <Link
                href="/auth/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                {" "}
                Register
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
