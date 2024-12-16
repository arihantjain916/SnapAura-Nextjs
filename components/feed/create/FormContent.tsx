"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CardFooter } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "@/lib/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import React, { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

export function FormContent({ className, ...props }: UserProfileType) {
  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const userProfile = z.object({
    content: z.string().min(1).max(1000),
  });

  type userProfileSchemaType = z.infer<typeof userProfile>;
  const form = useForm<userProfileSchemaType>({
    resolver: zodResolver(userProfile),
    defaultValues: {},
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes("image")) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  async function onSubmit(data: userProfileSchemaType) {
    try {
      const formData = new FormData();
      if (image && typeof image !== "string") {
        formData.append("image", image);
      }
      formData.append("caption", data.content);

      const res = await AxiosInstance.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
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
              <div>
                <div className="mb-4">
                  {imageUrl && <img src={imageUrl} alt="" />}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {/* Post Content Field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's on your mind?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <CardFooter className="flex justify-between mt-3">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Post</Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
