"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AxiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { userdata } from "@/redux/features/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailSent } from "../email-send";
import { GitHubBtn } from "../OAuth/GithubBtn";
import { GoogleBtn } from "../OAuth/GoogleBtn";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const UserRegSchema = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string().min(3),
    username: z.string().min(3),
  });

  type UserRegSchemaType = z.infer<typeof UserRegSchema>;
  const form = useForm<UserRegSchemaType>({
    resolver: zodResolver(UserRegSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: UserRegSchemaType) {
    setIsLoading(true);

    try {
      const res = await AxiosInstance.post("/auth/register", data);
      if (res.data.success) {
        dispatch(
          userdata({
            id: res.data.data.id,
            isAuthenticated: true,
            username: res.data.data.username,
            email: res.data.data.email,
            name: res.data.data.name ?? "",
            profile: res.data.data.profile ?? null,
          })
        );
        toast.success(res.data.message, {
          position: "bottom-right",
        });
        const ttl = new Date().getTime() + 5 * 60 * 1000;
        Cookies.set("AUTH_TOKEN", res.data.token, { expires: 7 });
        Cookies.set("isEmailVerified", "no", { expires: 1 });
        router.push(`/auth/email-sent?email=${res.data.data.email}&ttl=${ttl}`);
      } else {
        toast.warn(res.data.data.response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
      if (error.response.status === 500) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

    form.reset();
  }

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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="username"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Sign In with Email
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
        <GitHubBtn />
        <GoogleBtn />
      </div>
    </>
  );
}
