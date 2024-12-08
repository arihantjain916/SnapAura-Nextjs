"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CardFooter } from "../ui/card";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "@/lib/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { userdata } from "@/redux/features/auth";
import { ChangeEvent } from "react";
import React from "react";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

export function FormContent({ className, ...props }: UserProfileType) {
  const { username, email, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [image, setImage] = React.useState<File | null>(null);
  const dispatch = useDispatch();

  const userProfile = z.object({
    email: z
      .string()
      .email("This is not a valid email.")
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    password: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    username: z
      .string()
      .min(3)
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  });

  type userProfileSchemaType = z.infer<typeof userProfile>;
  const form = useForm<userProfileSchemaType>({
    resolver: zodResolver(userProfile),
    defaultValues: {
      email: email,
      password: "",
      username: username,
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes("image")) {
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  async function onSubmit(data: userProfileSchemaType) {
    try {
      const formData = new FormData();
      if (image && typeof image !== "string") {
        formData.append("profile", image);
      }
      formData.append("username", data.username || "");
      formData.append("email", data.email || "");

      const res = await AxiosInstance.post(
        "/user/update/profile?_method=PUT",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        }
      );
      if (res.data.status) {
        dispatch(
          userdata({
            isAuthenticated: true,
            username: res.data.data.username,
            email: res.data.data.email,
            profile: res.data.data.profile,
          })
        );
        toast.success(res.data.message, {
          position: "bottom-right",
        });
        // window.location.reload();
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
  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* profile Field */}
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={profile ?? "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
              </div>
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@exp.com" {...field} />
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
                        {...field}
                        //   disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        //   disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <CardFooter className="flex justify-between mt-3">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Update</Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
