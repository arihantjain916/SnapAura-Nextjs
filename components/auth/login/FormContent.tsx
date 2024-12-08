"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AxiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { userdata } from "@/redux/features/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const UserRegSchema = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string().min(3),
  });

  type UserRegSchemaType = z.infer<typeof UserRegSchema>;
  const form = useForm<UserRegSchemaType>({
    resolver: zodResolver(UserRegSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: UserRegSchemaType) {
    setIsLoading(true);

    try {
      const res = await AxiosInstance.post("/auth/login", data);
      console.log(res.data.status);
      if (res.data.status === "success") {
        dispatch(
          userdata({
            isAuthenticated: true,
            username: res.data.data.username,
            email: res.data.data.email,
          })
        );
        Cookies.set("AUTH_TOKEN", res.data.token, { expires: 7 });
        toast.success("Login Success", {
          position: "bottom-right",
        });
        router.push("/");
      } else {
        toast.warn(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
    }
    form.reset();
  }

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleGithubSignIn = () => {
    signIn("github");
  };

  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@exp.com"
                        {...field}
                        disabled={isLoading}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                        disabled={isLoading}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Signup with Email
              </Button>
            </div>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleGithubSignIn}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </>
  );
}
