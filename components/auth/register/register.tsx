import Link from "next/link";
import { UserAuthForm } from "./FormContent";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const RegisterComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[400px] ">
          <CardHeader>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
               Register to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to register
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
          <CardFooter>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
